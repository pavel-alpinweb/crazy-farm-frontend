export class Router {
    static get path(): string {
        const url = new URL(window.location.href);
        return  url.hash.slice(1);
    }

    static push(path: string) {
        window.location.replace(path);
    }

    public init(): void {
        Router.push('/#/');
        window.addEventListener('hashchange', () => {
            console.log('url changed', Router.path);
        });
    }
}