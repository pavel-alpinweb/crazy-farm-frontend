import * as PIXI from "pixi.js";
import { AbstractStaticSprite } from "./AbstractStaticSprite";
import { AbstractAnimatedSprite } from "./AbstractAnimatedSprite";
import { AbstractTilingSprite } from "./AbstractTilingSprite";

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

  interface EffectContainer {
    name: string;
    render: PIXI.Container | null;
  }

  type Containers = Array<Container>;

  interface DecorationContainer {
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
  }

  interface DecorationSprite {
    [key: string]:
      | { new (): AbstractStaticSprite }
      | { new (): AbstractTilingSprite };
  }
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
      background: "#78710e",
      backgroundAlpha: 0,
      view: canvas,
      width: 1200,
      height: 1000,
    });
    if (this.scene.renderer.view.style) {
      this.scene.renderer.view.style.touchAction = "auto";
    }
    this.scene.renderer.plugins.interaction.autoPreventDefault = false;
    this.initSprites();
    this.renderContainers();
    this.renderSprites();
    this.setEvents();
    this.setHandlers();
    return canvas;
  }

  public get element(): Element | null {
    if (!this.renderedElement) {
      this.renderedElement = this.render();
    }
    return this.renderedElement;
  }

  public remove(): void {
    this.scene?.destroy(true);
    this.renderedElement = null;
  }
}
