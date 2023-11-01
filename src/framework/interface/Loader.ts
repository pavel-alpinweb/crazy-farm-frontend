const template = (fadeTime: number) => `
    <div class="loader">
        <div class="loader__title">Loading...</div>
        <div class="loader__animation"></div>
        <style>
            .loader {
                transition-duration: ${fadeTime / 1000}s;
            }
        </style>
    </div>
`;

export class Loader {
  private $loaderContainer!: null | HTMLElement;
  private $loader!: HTMLElement;
  private readonly fadeTime!: number;

  constructor(time: number) {
    this.fadeTime = time;
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
    this.$loader.classList.add("fade");
    setTimeout(() => {
      this.$loader.remove();
    }, this.fadeTime);
  }

  public show() {
    const newElement = document.createElement("div");
    newElement.innerHTML = template(this.fadeTime);
    this.$loader = <HTMLElement>newElement.firstElementChild;
    this.add();
  }
}
