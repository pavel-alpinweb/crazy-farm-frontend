import * as PIXI from "pixi.js";
import {AbstractStaticSprite} from "./AbstractStaticSprite";
import {AbstractAnimatedSprite} from "./AbstractAnimatedSprite";

declare global {
  interface Sprites {
    [key: string]: AbstractStaticSprite | AbstractAnimatedSprite | null;
  }
}

export abstract class AbstractScene {
  private renderedElement: Element | null = null;
  public scene: PIXI.Application | null = null;
  public container: PIXI.Container | null = null;
  protected events: Events = {};
  public emits: Emits = {};
  protected abstract sprites: Sprites;
  protected abstract initSprites(): void;
  protected abstract renderSprites(): void;
  protected abstract setHandlers(): void;
  protected abstract setEvents(): void;

  private render(): Element | null {
    const canvas = document.createElement("canvas");
    this.scene = new PIXI.Application({
      background: "#1099bb",
      view: canvas,
    });

    this.container = new PIXI.Container();
    this.scene.stage.addChild(this.container);
    this.container.x = this.scene.screen.width / 2;
    this.container.y = this.scene.screen.height / 2;
    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;
    this.initSprites();
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

  public addSprite(sprite: PIXI.Sprite | PIXI.AnimatedSprite | null | undefined): void {
    if (this.container && sprite) {
      this.container.addChild(sprite);
    }
  }

  public removeSprite(sprite: PIXI.Sprite | PIXI.AnimatedSprite | null | undefined): void {
    if (this.container && sprite) {
      this.container.removeChild(sprite);
    }
  }

  public removeAllSprites() {
    this.container?.removeChildren();
  }

  public remove(): void {
    this.scene?.destroy();
    this.renderedElement = null;
  }
}
