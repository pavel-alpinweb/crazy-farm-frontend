export abstract class AbstractView {
    private renderedElement: Element | null = null;
    private renderPosition = {
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

        return this.renderedElement;
    }

    public remove(): void {
        this.renderedElement?.remove();
        this.renderedElement = null;
    }
}
