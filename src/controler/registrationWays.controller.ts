import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { RegistrationWaysScreen } from "../view/screens/RegistrationWays.screen";
import User from "../model/user.model";
import { $toaster } from "../main";
import AuthService from "../services/auth.service";
import Service from "../framework/Service";
import { Router } from "../framework/Router";

export default class RegistrationWaysController {
  private readonly userModel: User;
  private RegistrationWaysScreen: RegistrationWaysScreen | null;
  public methods: Methods = {};

  constructor(userModel: User) {
    this.userModel = userModel;
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
      sendGoogleCredential: async (credential: string) => {
        this.userModel.setLoading(true);
        try {
          const result = await AuthService.GoogleRegistration(credential);
          this.userModel.setUserData(result.user, false);
          Service.setToken(result.jws);
          Router.push("/#/");
        } catch (error: any) {
          for (const reason of error.response.data.reasons) {
            $toaster.show(`${reason}`, false);
          }
        } finally {
          this.userModel.setLoading(false);
        }
      },
    };
  }
}
