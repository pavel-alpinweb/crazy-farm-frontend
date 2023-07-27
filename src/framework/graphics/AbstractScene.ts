import * as PIXI from "pixi.js";
import { AbstractStaticSprite } from "./AbstractStaticSprite";
import { AbstractAnimatedSprite } from "./AbstractAnimatedSprite";
import {manifest} from "../../assets/manifests/farm.manifest";

declare global {
  type SingleSprite = AbstractStaticSprite | AbstractAnimatedSprite | null;
  interface SpritesArray {
    [key: string]: Array<SingleSprite>;
  }
  interface SpritesCollection {
    [key: string]: SingleSprite;
  }
  interface Container {
    name: string;
    render: PIXI.Container | null;
  }
  type Containers = Array<Container>;
}

export abstract class AbstractScene {
  private renderedElement: Element | null = null;
  protected events: Events = {};
  public emits: Emits = {};
  public scene: PIXI.Application | null = null;
  protected abstract state: object;
  protected abstract setState(props: object): void;
  protected abstract initSprites(): void;
  protected abstract renderContainers(): void;
  protected abstract renderSprites(): void;
  protected abstract setHandlers(): void;
  protected abstract setEvents(): void;

  private render(): Element | null {
    const canvas = document.createElement("canvas");
    this.scene = new PIXI.Application({
      background: "#1099bb",
      view: canvas,
    });
    if (this.scene.renderer.view.style) {
      this.scene.renderer.view.style.touchAction = "auto";
    }
    this.scene.renderer.plugins.interaction.autoPreventDefault = false;
    PIXI.Assets.init({ manifest }).then(() => {
      PIXI.Assets.loadBundle(manifest.bundles.map(bundle => bundle.name)).then((bundles) => {
        this.initSprites();
        this.renderContainers();
        this.renderSprites();
        this.setEvents();
        this.setHandlers();
      });
    });
    return canvas;
  }

  public get element(): Element | null {
    if (!this.renderedElement) {
      this.renderedElement = this.render();
    }
    return this.renderedElement;
  }

  public remove(): void {
    this.scene?.destroy();
    this.renderedElement = null;
  }
}
