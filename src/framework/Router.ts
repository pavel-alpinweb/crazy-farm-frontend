import AuthController from "../controler/auth.controller";

declare global {
    type controller = AuthController;
    interface RouterParams {
        url: string,
        controller: controller,
    }
}

export class Router {
    private params: Array<RouterParams> = [];
    constructor(params: Array<RouterParams>) {
        this.params = params;
    }
    static get path(): string {
        const url = new URL(window.location.href);
        return  url.hash.slice(1);
    }

    static push(path: string) {
        window.location.replace(path);
    }

    private changePageHandler = () => {
        const route: any = this.params.find((item: any) => item.url === Router.path);
        if (route) {
            route.controller.methods.init();
        } else {
            Router.push('/#/404');
        }
    }

    public init(): void {
        window.addEventListener('hashchange', this.changePageHandler);
        Router.push('/#/');
        this.changePageHandler();
    }
}