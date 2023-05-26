import FarmController from "../controler/farm.controller";
import Error404ScreenController from "../controler/404.controller";
import { LoginController } from "../controler/login.controller";
import { RegistrationController } from "../controler/registration.controller";

declare global {
  type controller =
    | FarmController
    | Error404ScreenController
    | LoginController
    | RegistrationController;
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
  static get path(): string {
    const url = new URL(window.location.href);
    return url.hash.slice(1);
  }

  static push(path: string) {
    window.location.replace(path);
  }

  private changePageHandler = () => {
    const route: RouterParams | undefined = this.params.find(
      (item: RouterParams) => item.url === Router.path
    );
    if (this.controller === route?.controller) return;
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
    Router.push("/#/");
    this.changePageHandler();
  }
}
