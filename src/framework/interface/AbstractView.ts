declare global {
    interface RenderPositions {
        BEFOREBEGIN: 'beforebegin',
        AFTERBEGIN: 'afterbegin',
        BEFOREEND: 'beforeend',
        AFTEREND: 'afterend',
    }
}
export abstract class AbstractView {
    private renderedElement: Element | null = null;
    public static positions: RenderPositions = {
        BEFOREBEGIN: 'beforebegin',
        AFTERBEGIN: 'afterbegin',
        BEFOREEND: 'beforeend',
        AFTEREND: 'afterend',
    };
    abstract get template(): string;
    public get element(): Element | null {
        if (!this.renderedElement) {
            this.renderedElement = this.render();
        }
        return this.renderedElement;
    }
    private render(): Element | null  {
        const newElement = document.createElement('div');
        newElement.innerHTML = this.template;

        return newElement.firstElementChild;
    }

    public remove(): void {
        this.renderedElement?.remove();
        this.renderedElement = null;
    }
}
