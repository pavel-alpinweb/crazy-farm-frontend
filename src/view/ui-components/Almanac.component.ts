import { AbstractView } from "../../framework/interface/AbstractView";
import { $t } from "../../utils/helpers";
import { eventBusAlmanac } from "../../model/almanac.model";
import {eventBusUser} from "../../model/user.model";

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

    this.emits.setExitClickEvent = (callback: (data: Concrete) => void) => {
      this.events.clickExit = callback;
    };

    this.emits.setRestartClickEvent = (callback: (data: Concrete) => void) => {
      this.events.clickRestart = callback;
    };

    const toggleView = (data: AlmanacState) => {
      this.state.isActive = data.isActive;
      this.state.currentTextKey = data.currentTextKey;
      this.state.currentActions = data.currentActions;
      this.state.isShow = data.isShow;

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

    eventBusUser.off("User:language", () => {
      toggleView(this.state);
    });
    eventBusUser.on("User:language", () => {
      toggleView(this.state);
    });
  }

  setHandlers() {
    const understandButton = this.element?.querySelector("[data-action-close]");
    const activateButton = this.element?.querySelector("[data-action-show]");
    const exitButton = this.element?.querySelector("[data-action-exit]");
    const restartButton = this.element?.querySelector("[data-action-restart]");
    const noButton = this.element?.querySelector("[data-action-no-close]");

    understandButton?.addEventListener("click", () => {
      if (this.events.clickUnderstand) {
        this.events.clickUnderstand(false);
      }
    });
    noButton?.addEventListener("click", () => {
      if (this.events.clickUnderstand) {
        this.events.clickUnderstand(false);
      }
    });
    activateButton?.addEventListener("click", () => {
      if (this.events.clickActivate) {
        this.events.clickActivate(true);
      }
    });

    exitButton?.addEventListener("click", () => {
      if (this.events.clickExit) {
        this.events.clickExit(true);
      }
    });

    restartButton?.addEventListener("click", () => {
      if (this.events.clickRestart) {
        this.events.clickRestart(true);
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
