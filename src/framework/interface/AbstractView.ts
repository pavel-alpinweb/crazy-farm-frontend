declare global {
  interface RenderPositions {
    BEFOREBEGIN: "beforebegin";
    AFTERBEGIN: "afterbegin";
    BEFOREEND: "beforeend";
    AFTEREND: "afterend";
  }
  interface Components {
    [key: string]: AbstractView | null;
  }
}
export abstract class AbstractView {
  protected renderedElement: Element | null = null;
  private render(): Element | null {
    const newElement = document.createElement("div");
    newElement.innerHTML = this.template;

    return newElement.firstElementChild;
  }
  abstract get template(): string;
  setHandlers() {
    console.log('Init handlers', this.constructor.name);
  }
  protected abstract state: object;

  public static positions: RenderPositions = {
    BEFOREBEGIN: "beforebegin",
    AFTERBEGIN: "afterbegin",
    BEFOREEND: "beforeend",
    AFTEREND: "afterend",
  };
  public get element(): Element | null {
    if (!this.renderedElement) {
      this.renderedElement = this.render();
      this.setHandlers();
    }
    return this.renderedElement;
  }
  public remove(): void {
    this.renderedElement?.remove();
    this.renderedElement = null;
  }
}
