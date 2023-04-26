import User from "../model/user.model";
import { appContainer } from "../utils/constants";
import { AuthScreen } from "../view/screens/Auth.screen";
import {AbstractView} from "../framework/interface/AbstractView";
import {AbstractScreen} from "../framework/interface/AbstractScreen";
import {getUserDataMock} from "../mock/auth.mock";

export default class AuthController {
  private readonly userModel: User;
  private AuthScreen: AbstractScreen | null;
  constructor(userModel: User) {
    this.userModel = userModel;
    this.AuthScreen = null;
  }

  public async init() {
    console.log("User Model:", this.userModel.data);
    await this.fetchUser();
    this.AuthScreen = new AuthScreen({user: this.userModel.data});
    appContainer?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.AuthScreen.element
    );
  }

  public async fetchUser() {
    const user = await getUserDataMock();
    this.userModel.setUserData(user);
  }
}
