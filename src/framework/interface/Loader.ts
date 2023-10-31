const template = () => `
    <div class="loader">
        <div class="loader__animation">Loading...</div>
    </div>
`;

export class Loader {
    private $loaderContainer!: null | HTMLElement;
    private isStateLoading = false;

    public get isLoading() {
        return this.isStateLoading;
    }

    private add($loader: HTMLElement) {
        if (!this.$loaderContainer) {
            this.$loaderContainer = document.createElement("div");
            this.$loaderContainer.classList.add("loader-container");
            const $body = document.querySelector("body");
            $body?.appendChild(this.$loaderContainer);
        }
        this.$loaderContainer.appendChild($loader);
    }

    private remove($loader: HTMLElement) {
        $loader.remove();
    }

    public show() {
        const newElement = document.createElement("div");
        newElement.innerHTML = template();
        const $loader = newElement.firstElementChild;
        this.add(<HTMLElement>$loader);
    }
}