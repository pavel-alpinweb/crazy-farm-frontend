import User from "../model/user.model";
import {appContainer} from "../utils/constants";
import {AuthScreen} from "../view/screens/Auth.screen";
import {AbstractView} from "../framework/interface/AbstractView";

export default class AuthController {
  private userModel: User;
  private $AuthScreen: AbstractView;
  constructor(userModel: User) {
      this.userModel = userModel;
      this.$AuthScreen = new AuthScreen();
  }

  public init() {
      console.log('User Model:', this.userModel.data);
      appContainer?.insertAdjacentElement(AbstractView.positions.BEFOREEND, <Element>this.$AuthScreen.element);
  }
}
