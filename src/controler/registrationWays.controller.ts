import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { RegistrationWaysScreen } from "../view/screens/RegistrationWays.screen";

export default class RegistrationWaysController {
  private RegistrationWaysScreen: RegistrationWaysScreen | null;
  public methods: Methods = {};

  constructor() {
    this.RegistrationWaysScreen = null;
    this.methods = {
      init: () => {
        this.RegistrationWaysScreen = new RegistrationWaysScreen(this.methods);
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.RegistrationWaysScreen.element
        );
      },
      destroy: () => {
        this.RegistrationWaysScreen?.remove();
        this.RegistrationWaysScreen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
    };
  }
}
