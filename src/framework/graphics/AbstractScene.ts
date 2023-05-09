import * as PIXI from "pixi.js";

export class AbstractScene {
  private renderedElement: Element | null = null;
  private scene: PIXI.Application | null = null;

  private render(): Element | null {
      const newElement = document.createElement("div");
      this.scene = new PIXI.Application({ background: '#1099bb' });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newElement.appendChild(this.scene);
      return newElement;
  }

  private get element(): Element | null {
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
