import FarmController from "../controler/farm.controller";
import Error404ScreenController from "../controler/404.controller";
import { LoginController } from "../controler/login.controller";
import { RegistrationController } from "../controler/registration.controller";
import DevRoomController from "../controler/devRoom.controller";
import WelcomeController from "../controler/welcome.controller";
import RegistrationWaysController from "../controler/registrationWays.controller";

declare global {
  type controller =
    | FarmController
    | Error404ScreenController
    | LoginController
    | RegistrationController
    | RegistrationWaysController
    | DevRoomController
    | WelcomeController;
  interface RouterParams {
    url: string;
    controller: controller;
  }
}

export class Router {
  private params: Array<RouterParams> = [];
  private controller: controller | undefined;
  constructor(params: Array<RouterParams>) {
    this.params = params;
  }
  static get path(): Array<string> {
    const url = new URL(window.location.href);
    return url.hash.slice(1).split("?");
  }

  static getParam(name: string): string | null {
    const paramsParts = Router.path[1]?.split("=");
    if (paramsParts && paramsParts[0] === name) {
      return paramsParts[1];
    } else {
      return null;
    }
  }

  static push(path: string) {
    window.location.replace(path);
  }

  private changePageHandler = () => {
    const route: RouterParams | undefined = this.params.find(
      (item: RouterParams) => item.url === Router.path[0]
    );
    if (route) {
      this.controller?.methods.destroy();
      this.controller = route.controller;
      this.controller.methods.init();
    } else {
      Router.push("/#/404");
    }
  };

  public init(): void {
    window.addEventListener("hashchange", this.changePageHandler);
    const registrationToken = Router.getParam("token");
    if (registrationToken) {
      Router.push(`/#/?token=${registrationToken}`);
    } else if (Router.path[0].length === 0) {
      Router.push("/#/");
    }

    this.changePageHandler();
  }
}
