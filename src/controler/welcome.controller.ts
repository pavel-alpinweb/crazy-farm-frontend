import { WelcomeScreen } from "../view/screens/Welcome.screen";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import User from "../model/user.model";

export default class WelcomeController {
  private readonly userModel: User;
  private WelcomeScreen: WelcomeScreen | null;
  public methods: Methods = {};

  constructor(userModel: User) {
    this.WelcomeScreen = null;
    this.userModel = userModel;
    this.methods = {
      init: () => {
        this.WelcomeScreen = new WelcomeScreen(
          {
            language: this.userModel.language,
          },
          this.methods
        );
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.WelcomeScreen.element
        );
      },
      setLanguage: (value: language) => {
        this.userModel.setUserLanguage(value);
      },
      destroy: () => {
        this.WelcomeScreen?.remove();
        this.WelcomeScreen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
    };
  }
}
