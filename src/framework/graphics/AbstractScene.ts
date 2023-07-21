import * as PIXI from "pixi.js";
import { AbstractStaticSprite } from "./AbstractStaticSprite";
import { AbstractAnimatedSprite } from "./AbstractAnimatedSprite";
import {ResolverManifest} from "pixi.js";
import {ANIMATED_SPRITE_URL, STATIC_SPRITE_URL} from "../../utils/constants";

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
    const manifest: ResolverManifest = {
      bundles: [
        {
          name: 'land_sprite',
          assets: {
            sprite: `${STATIC_SPRITE_URL}/land.sprite.png`,
          },
        },
        {
          name: 'sprout_potato',
          assets: {
              sprite_sheet: `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato.png`,
              sprite_data: `${ANIMATED_SPRITE_URL}/sprout-potato/sprout-potato.json`,
          },
        },
      ]
    };
    PIXI.Assets.init({ manifest }).then(() => {
      PIXI.Assets.loadBundle(manifest.bundles.map(bundle => bundle.name)).then((data) => {
        console.log('Load bundle', data);
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
