const template = (message: string, isSuccess: boolean): string => `
    <div class="toaster ${isSuccess ? "toaster--success" : "toaster--error"}">
        <span class="toaster__message">${message}</span>
    </div>
`;

export class Toaster {
  private $toasterContainer!: null | HTMLElement;
  private timeout!: number;

  constructor(timeout: number) {
    this.timeout = timeout;
  }

  private add($toaster: HTMLElement) {
    if (!this.$toasterContainer) {
      this.$toasterContainer = document.createElement("div");
      this.$toasterContainer.classList.add("toaster-container");
      const $body = document.querySelector("body");
      $body?.appendChild(this.$toasterContainer);
    }
    this.$toasterContainer.appendChild($toaster);
  }

  private remove($toaster: HTMLElement) {
    $toaster.remove();
  }

  public show(message: string, isSuccess: boolean) {
    const newElement = document.createElement("div");
    newElement.innerHTML = template(message, isSuccess);
    const $toaster = newElement.firstElementChild;
    this.add(<HTMLElement>$toaster);
    setTimeout(() => {
      this.remove(<HTMLElement>$toaster);
    }, this.timeout);
  }
}
