import { WelcomeScreen } from "../view/screens/Welcome.screen";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import User from "../model/user.model";
import Cookies from "js-cookie";
import AuthService from "../services/auth.service";
import Service from "../framework/Service";
import { Router } from "../framework/Router";
import { $toaster } from "../main";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { AbstractStaticScreen } from "../framework/interface/AbstractStaticScreen";
import { AbstractController } from "../framework/AbstractController";

export default class WelcomeController extends AbstractController {
  protected Screen!: AbstractScreen | AbstractStaticScreen;
  private readonly userModel: User;

  constructor(userModel: User) {
    super();
    this.userModel = userModel;
  }

  async init(): Promise<void> {
    const lang = Cookies.get("crazy-farm-lang") ?? "en";
    await this.methods.setLanguage(<language>lang);
    this.Screen = new WelcomeScreen(
      {
        language: this.userModel.language,
      },
      this.methods
    );
    appContainer?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.Screen.element
    );
  }

  methods: Methods = {
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
  };
}
