import User from "../model/user.model";
import { appContainer } from "../utils/constants";
import { AuthScreen } from "../view/screens/Auth.screen";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { getUserDataMock, updateUserDataMock } from "../mock/auth.mock";

declare global {
  interface Methods {
    [key: string]: (...args: any) => void;
  }
}

export default class AuthController {
  private readonly userModel: User;
  private AuthScreen: AbstractScreen | null;
  public methods: Methods = {};
  constructor(userModel: User) {
    this.userModel = userModel;
    this.AuthScreen = null;
    this.methods = {
      init: async () => {
        await this.methods.fetchUser();
        this.AuthScreen = new AuthScreen(
          { user: this.userModel.data },
          this.methods
        );
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.AuthScreen.element
        );
      },
      destroy: () => {
        this.AuthScreen?.remove();
        this.AuthScreen = null;
        if (appContainer) {
          appContainer.innerHTML = '';
        }
      },
      fetchUser: async () => {
        const user: UserData = await getUserDataMock();
        this.userModel.setUserData(user, false);
      },
      updateUser: async (data: UserData) => {
        const user: UserData = await updateUserDataMock(data);
        this.userModel.setUserData(user, true);
      },
    };
  }
}
