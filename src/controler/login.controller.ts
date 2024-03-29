import User from "../model/user.model";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { LoginScreen } from "../view/screens/Login.screen";
import { Router } from "../framework/Router";
import Service from "../framework/Service";
import AuthService from "../services/auth.service";
import { $toaster } from "../main";
import { AbstractController } from "../framework/AbstractController";
import { AbstractStaticScreen } from "../framework/interface/AbstractStaticScreen";

export class LoginController extends AbstractController {
  protected Screen!: AbstractScreen | AbstractStaticScreen;
  private readonly userModel: User;
  constructor(userModel: User) {
    super();
    this.userModel = userModel;
  }
  public init(): void {
    this.Screen = new LoginScreen(
      {
        user: {
          loggin: "",
          password: "",
        },
      },
      this.methods
    );
    appContainer?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.Screen.element
    );
  }

  methods: Methods = {
    login: async (data: UserData) => {
      this.userModel.setLoading(true);
      try {
        const result = await AuthService.enter(data);
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
