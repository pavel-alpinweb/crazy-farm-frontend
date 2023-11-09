import { AbstractView } from "../../framework/interface/AbstractView";
import { $t } from "../../utils/helpers";
import { eventBusAlmanac } from "../../model/almanac.model";

const createAlmanacTemplate = (state: AlmanacState) => `
    <div class="almanac ${state.isShow ? "active" : ""}">
        <div class="almanac__text">${$t(state.currentTextKey)}</div>
        <div class="almanac__buttons">
            ${state.currentActions
              .map(
                (button) => `
                <button class="button green" data-action-${button}>${$t(
                  `almanacActions.${button}`
                )}</button> 
            `
              )
              .join("")}
        </div>
    </div>
`;

export class AlmanacComponent extends AbstractView {
  protected state: AlmanacState = {
    isActive: false,
    isShow: false,
    currentTextKey: "almanacDefault",
    currentActions: ["show", "close"],
  };
  constructor(props: AlmanacState) {
    super();
    this.setState(props);
    this.setEvents();
  }

  protected setEvents(): void {
    this.emits.setUnderstandClickEvent = (
      callback: (data: Concrete) => void
    ) => {
      this.events.clickUnderstand = callback;
    };
    this.emits.setActivateClickEvent = (callback: (data: Concrete) => void) => {
      this.events.clickActivate = callback;
    };

    const toggleView = (data: AlmanacState) => {
      this.state = data;
      this.state.isShow
        ? this.element?.classList.add("active")
        : this.element?.classList.remove("active");
      setTimeout(() => {
        this.rerenderElement();
      }, 1100);
    };

    eventBusAlmanac.off("Almanac:toggleView", toggleView);
    eventBusAlmanac.on("Almanac:toggleView", toggleView);
  }

  setHandlers() {
    const understandButton = this.element?.querySelector("[data-action-close]");
    const activateButton = this.element?.querySelector("[data-action-show]");

    understandButton?.addEventListener("click", () => {
      if (this.events.clickUnderstand) {
        this.events.clickUnderstand(false);
      }
    });
    activateButton?.addEventListener("click", () => {
      if (this.events.clickActivate) {
        this.events.clickActivate(true);
      }
    });
  }

  protected setState(props: AlmanacState): void {
    this.state = props;
  }

  get template(): string {
    return createAlmanacTemplate(this.state);
  }
}
