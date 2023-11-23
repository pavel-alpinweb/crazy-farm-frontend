import User from "../model/user.model";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { RegistrationScreen } from "../view/screens/Registration.screen";
import AuthService from "../services/auth.service";
import { $toaster } from "../main";
import { AbstractController } from "../framework/AbstractController";
import { AbstractStaticScreen } from "../framework/interface/AbstractStaticScreen";

export class RegistrationController extends AbstractController {
  protected Screen!: AbstractScreen | AbstractStaticScreen;
  private readonly userModel: User;
  constructor(userModel: User) {
    super();
    this.userModel = userModel;
  }

  init(): void {
    this.Screen = new RegistrationScreen(
      {
        user: {
          loggin: "",
          password: "",
          email: "",
        },
      },
      this.methods
    );
    appContainer?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.Screen.element
    );
  }

  methods = {
    sendRegistrationData: async (data: UserData) => {
      this.userModel.setLoading(true);
      try {
        const result: successMessage = await AuthService.registrationFirstStep(
          data
        );
        $toaster.show(result, true);
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
