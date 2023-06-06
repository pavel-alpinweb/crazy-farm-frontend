import User from "../model/user.model";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { RegistrationScreen } from "../view/screens/Registration.screen";
import { registrationFirstStep } from "../mock/auth.mock";
import Service from "../framework/Service";
import AuthService from "../services/auth.service";

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
      sendRegistrationData: async (data: UserData) => {
        this.userModel.setLoading(true);
        try {
          // const result = await registrationFirstStep(data, true);
          // alert(result);
          const result = await AuthService.test();
          console.log('AuthService: test', result.data);
        } catch (error) {
          if (Service.instanceOfHttpError(error)) {
            alert(`Error ${error.httpErrorCode}: ${error.httpStatus}`);
          }
        } finally {
          this.userModel.setLoading(false);
        }
      },
    };
  }
}
