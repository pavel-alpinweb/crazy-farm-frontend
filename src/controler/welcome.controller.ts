import { WelcomeScreen } from "../view/screens/Welcome.screen";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import User from "../model/user.model";
import Cookies from "js-cookie";
import AuthService from "../services/auth.service";
import Service from "../framework/Service";
import { Router } from "../framework/Router";
import { $toaster } from "../main";

export default class WelcomeController {
  private readonly userModel: User;
  private WelcomeScreen: WelcomeScreen | null;
  public methods: Methods = {};

  constructor(userModel: User) {
    this.WelcomeScreen = null;
    this.userModel = userModel;
    this.methods = {
      init: async () => {
        const lang = Cookies.get("crazy-farm-lang") ?? "en";
        await this.methods.setLanguage(<language>lang);
        this.WelcomeScreen = new WelcomeScreen(
          {
            language: this.userModel.language,
          },
          this.methods
        );
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.WelcomeScreen.element
        );
      },
      setLanguage: (value: language) => {
        this.userModel.setUserLanguage(value);
      },
      sendGoogleCredential: async (credential: string) => {
        this.userModel.setLoading(true);
        try {
          const result = await AuthService.GoogleEnter(credential);
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
      destroy: () => {
        this.WelcomeScreen?.remove();
        this.WelcomeScreen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
    };
  }
}
