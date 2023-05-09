import * as PIXI from "pixi.js";

export class AbstractScene {
  private renderedElement: Element | null = null;
  private scene: PIXI.Application | null = null;
    protected events: Events = {};
    public emits: Emits = {};

  private render(): Element | null {
    const newElement = document.createElement("div");
    const canvas = document.createElement("canvas");
    this.scene = new PIXI.Application({
      background: "#1099bb",
      view: canvas,
    });
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
