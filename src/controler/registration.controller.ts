import User from "../model/user.model";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { RegistrationScreen } from "../view/screens/Registration.screen";
import { getUserDataMock, updateUserDataMock } from "../mock/auth.mock";
import { Router } from "../framework/Router";

export class RegistrationController {
  private readonly userModel: User;
  private Screen: AbstractScreen | null;
  public methods: Methods = {};
  constructor(userModel: User) {
    this.userModel = userModel;
    this.Screen = null;
    this.methods = {
      init: () => {
        this.Screen = new RegistrationScreen(
          { user: this.userModel.data },
          this.methods
        );
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.Screen.element
        );
      },
      destroy: () => {
        this.Screen?.remove();
        this.Screen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
      updateUser: async (data: UserData) => {
        const user: UserData = await updateUserDataMock(data);
        this.userModel.setUserData(user, true);
        Router.push("/#/");
      },
      fetchUser: async () => {
        const user: UserData = await getUserDataMock();
        this.userModel.setUserData(user, false);
      },
    };
  }
}