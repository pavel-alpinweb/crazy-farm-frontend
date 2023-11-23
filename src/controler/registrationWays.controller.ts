import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { AbstractStaticScreen } from "../framework/interface/AbstractStaticScreen";
import { RegistrationWaysScreen } from "../view/screens/RegistrationWays.screen";
import User from "../model/user.model";
import { $toaster } from "../main";
import AuthService from "../services/auth.service";
import Service from "../framework/Service";
import { Router } from "../framework/Router";
import {AbstractController} from "../framework/AbstractController";

export default class RegistrationWaysController extends AbstractController{
  protected Screen!: AbstractScreen | AbstractStaticScreen;
  private readonly userModel: User;

  constructor(userModel: User) {
    super();
    this.userModel = userModel;
  }

  init(): void {
        this.Screen = new RegistrationWaysScreen(this.methods);
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.Screen.element
        );
  }

  methods = {
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
