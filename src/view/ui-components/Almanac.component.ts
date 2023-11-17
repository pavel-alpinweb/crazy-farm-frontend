import { AbstractView } from "../../framework/interface/AbstractView";
import { $t } from "../../utils/helpers";
import { eventBusAlmanac } from "../../model/almanac.model";

const createTextTemplate = (currentTextKey: string) => $t(currentTextKey);

const createButtonsTemplate = (currentActions: Array<AlmanacAction>) => `
  ${currentActions
    .map(
        (button) => `
                <button class="button green" data-action-${button}>${$t(
            `almanacActions.${button}`
        )}</button> 
            `
    )
    .join("")}
`;

const createAlmanacTemplate = (state: AlmanacState) => `
    <div class="almanac">
        <div class="almanac__text">${createTextTemplate(state.currentTextKey)}</div>
        <div class="almanac__buttons">${createButtonsTemplate(state.currentActions)}</div>
    </div>
`;

export class AlmanacComponent extends AbstractView {
  protected state: AlmanacState = {
    isActive: false,
    isShow: false,
    currentTextKey: "",
    currentActions: [],
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
      this.state.isActive = data.isActive;
      this.state.currentTextKey = data.currentTextKey;
      this.state.currentActions = data.currentActions;

      const text = this.element?.querySelector('.almanac__text');
      const buttons = this.element?.querySelector('.almanac__buttons');
      if (text) text.innerHTML = createTextTemplate(this.state.currentTextKey);
      if (buttons) buttons.innerHTML = createButtonsTemplate(this.state.currentActions);
      this.setHandlers();
      data.isShow
        ? this.element?.classList.add("active")
        : this.element?.classList.remove("active");
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
