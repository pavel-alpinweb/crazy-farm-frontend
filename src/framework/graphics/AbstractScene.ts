import * as PIXI from "pixi.js";
import {AbstractStaticSprite} from "./AbstractStaticSprite";

declare global {
  interface Sprites {
    [key: string]: AbstractStaticSprite | null;
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

  private render(): Element | null {
    const newElement = document.createElement("div");
    const canvas = document.createElement("canvas");
    this.scene = new PIXI.Application({
      background: "#1099bb",
      width: 800,
      height: 600,
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
    newElement.append(canvas);
    return newElement;
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
