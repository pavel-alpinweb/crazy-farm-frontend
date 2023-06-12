import User from "../model/user.model";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { LoginScreen } from "../view/screens/Login.screen";
import { Router } from "../framework/Router";
import { enter } from "../mock/auth.mock";
import Service from "../framework/Service";
import AuthService from "../services/auth.service";

export class LoginController {
  private readonly userModel: User;
  private Screen: AbstractScreen | null;
  public methods: Methods = {};
  constructor(userModel: User) {
    this.userModel = userModel;
    this.Screen = null;
    this.methods = {
      init: () => {
        this.Screen = new LoginScreen(
          { user: this.userModel.data },
          this.methods
        );
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.Screen.element
        );
      },
      login: async (data) => {
        this.userModel.setLoading(true);
        try {
          const result = await AuthService.enter(data);
          this.userModel.setUserData(result.user, false);
          Service.setToken(result.jws);
          Router.push("/#/");
        } catch (error: any) {
          alert(
            `Error ${error.response.data.httpErrorCode}: ${error.response.data.httpStatus}`
          );
        } finally {
          this.userModel.setLoading(false);
        }
      },
      destroy: () => {
        this.Screen?.remove();
        this.Screen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
    };
  }
}
