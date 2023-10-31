const template = () => `
    <div class="loader">
        <div class="loader__title">Loading...</div>
        <div class="loader__animation"></div>
    </div>
`;

export class Loader {
    private $loaderContainer!: null | HTMLElement;
    private $loader!: HTMLElement;
    private isStateLoading = false;

    public get isLoading() {
        return this.isStateLoading;
    }

    private add() {
        if (!this.$loaderContainer) {
            this.$loaderContainer = document.createElement("div");
            this.$loaderContainer.classList.add("loader-container");
            const $body = document.querySelector("body");
            $body?.appendChild(this.$loaderContainer);
        }
        this.$loaderContainer.appendChild(this.$loader);
    }

    public remove() {
        this.$loader.remove();
    }

    public show() {
        const newElement = document.createElement("div");
        newElement.innerHTML = template();
        this.$loader = <HTMLElement>newElement.firstElementChild;
        this.add();
    }
}