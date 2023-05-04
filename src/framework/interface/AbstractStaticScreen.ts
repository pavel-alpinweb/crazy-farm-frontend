export abstract class AbstractStaticScreen {
  protected renderedElement: Element | null = null;

  private render(): Element | null {
    const newElement = document.createElement("div");
    newElement.innerHTML = this.template;

    return newElement.firstElementChild;
  }
  abstract get template(): string;

  public get element(): Element | null {
    if (!this.renderedElement) {
      this.renderedElement = this.render();
    }
    return this.renderedElement;
  }

  public remove(): void {
    this.renderedElement = null;
  }
}
