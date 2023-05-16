declare global {
  type Concrete = string | number | boolean | symbol | object;
  interface RenderPositions {
    BEFOREBEGIN: "beforebegin";
    AFTERBEGIN: "afterbegin";
    BEFOREEND: "beforeend";
    AFTEREND: "afterend";
  }
  interface Events {
    [key: string]: (data: Concrete) => void;
  }

  interface Emits {
    [key: string]: (callback: (data: Concrete) => void) => void;
  }
}
export abstract class AbstractView {
  protected renderedElement: Element | null = null;
  protected events: Events = {};
  public emits: Emits = {};
  private render(): Element | null {
    const newElement = document.createElement("div");
    newElement.innerHTML = this.template;

    return newElement.firstElementChild;
  }
  abstract get template(): string;
  protected abstract setState(props: object): void;
  protected abstract setEvents(): void;
  setHandlers() {
    console.warn("Init handlers", this.constructor.name);
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
    this.renderedElement = null;
  }

  protected rerenderElement(): void {
    const prevElement = this.element;
    const parent = prevElement?.parentElement;
    this.remove();

    const newElement = this.element;
    parent?.replaceChild(<Element>newElement, <Element>prevElement);
  }
}
