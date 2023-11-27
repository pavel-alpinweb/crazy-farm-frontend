import {AbstractController} from "./AbstractController";

declare global {
  interface RouterParams {
    url: string;
    controller: AbstractController;
  }
}

export class Router {
  private params: Array<RouterParams> = [];
  private controller: AbstractController | undefined;
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
      this.controller?.destroy();
      this.controller = route.controller;
      this.controller.init();
    } else {
      Router.push("/#/404");
    }
  };

  public init(): void {
    window.addEventListener("hashchange", this.changePageHandler);
    if (Router.path[0].length === 0) {
      Router.push("/#/");
    } else {
      window.onload = this.changePageHandler;
    }
    const registrationToken = Router.getParam("token");
    if (registrationToken) {
      Router.push(`/#/?token=${registrationToken}`);
    }
  }
}
