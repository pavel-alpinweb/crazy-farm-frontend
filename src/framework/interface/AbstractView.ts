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
        return this.renderedElement;
    }
    public render(): Element | null  {
        const newElement = document.createElement('div');
        newElement.innerHTML = this.template;

        this.renderedElement = newElement.firstElementChild
        return this.renderedElement;
    }

    public remove(): void {
        this.renderedElement?.remove();
        this.renderedElement = null;
    }
}
