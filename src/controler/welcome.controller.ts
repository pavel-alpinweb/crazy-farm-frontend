import {WelcomeScreen} from "../view/screens/Welcome.screen";
import {appContainer} from "../utils/constants";
import {AbstractView} from "../framework/interface/AbstractView";

export default class WelcomeController {
    private WelcomeScreen: WelcomeScreen | null;
    public methods: Methods = {};

    constructor() {
        this.WelcomeScreen = null;
        this.methods = {
            init: () => {
                this.WelcomeScreen = new WelcomeScreen();
                appContainer?.insertAdjacentElement(
                    AbstractView.positions.BEFOREEND,
                    <Element>this.WelcomeScreen.element
                );
            },
            destroy: () => {
                this.WelcomeScreen?.remove();
                this.WelcomeScreen = null;
                if (appContainer) {
                    appContainer.innerHTML = "";
                }
            },
        }
    }
}