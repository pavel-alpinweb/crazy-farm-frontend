import * as PIXI from "pixi.js";
import { AbstractStaticSprite } from "./AbstractStaticSprite";
import { AbstractAnimatedSprite } from "./AbstractAnimatedSprite";

declare global {
  interface Container {
    name: string;
    render: PIXI.Container | null;
  }
  interface Sprites {
    [key: string]: AbstractStaticSprite | AbstractAnimatedSprite | null;
  }
  interface Containers {
    [key: string]: Container;
  }
}

export abstract class AbstractScene {
  private renderedElement: Element | null = null;
  public scene: PIXI.Application | null = null;
  protected events: Events = {};
  public emits: Emits = {};
  protected abstract sprites: Sprites;
  protected abstract containers: Containers;
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
    this.initSprites();
    this.renderContainers();
    this.renderSprites();
    this.setEvents();
    this.setHandlers();
    return canvas;
  }

  protected renderContainer(container: Container): void {
    if (container.render) return;
    else {
      container.render = new PIXI.Container();
      this.scene?.stage.addChild(container.render);
    }
  }

  protected setContainerX(container: Container, x: number): void {
    if (container.render) {
      container.render.x = x;
    }
  }

  protected setContainerY(container: Container, y: number): void {
    if (container.render) {
      container.render.y = y;
    }
  }
  protected setContainerPivotX(container: Container, x: number): void {
    if (container.render) {
      container.render.pivot.x = x;
    }
  }

  protected setContainerPivotY(container: Container, y: number): void {
    if (container.render) {
      container.render.pivot.y = y;
    }
  }

  protected centerContainer(container: Container): void {
    if (this.scene) {
      this.setContainerX(container, this.scene.screen.width / 2);
      this.setContainerY(container, this.scene.screen.height / 2);
    }
  }

  protected centerPivotContainer(container: Container): void {
    if (container.render) {
      this.setContainerPivotX(container, container.render.width / 2);
      this.setContainerPivotY(container, container.render.height / 2);
    }
  }

  protected addSprite(
      container: Container,
      sprite: PIXI.Sprite | PIXI.AnimatedSprite | null | undefined
  ): void {
    if (container.render && sprite) {
      container.render.addChild(sprite);
    }
  }

  protected removeSprite(
      container: Container,
      sprite: PIXI.Sprite | PIXI.AnimatedSprite | null | undefined
  ): void {
    if (container.render && sprite) {
      container.render.removeChild(sprite);
    }
  }

  protected removeAllSprites(container: Container) {
    container.render?.removeChildren();
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
