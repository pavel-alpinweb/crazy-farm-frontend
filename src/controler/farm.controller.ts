import {AbstractStaticScreen} from "../framework/interface/AbstractStaticScreen";
import {FarmScreen} from "../view/screens/Farm.screen";
import {appContainer} from "../utils/constants";
import {AbstractView} from "../framework/interface/AbstractView";

export default class FarmController {
    private FarmScreen: AbstractStaticScreen | null;
    public methods: Methods = {};

    constructor() {
        this.FarmScreen = null;
        this.methods = {
            init: () => {
                this.FarmScreen = new FarmScreen();
                appContainer?.insertAdjacentElement(
                    AbstractView.positions.BEFOREEND,
                    <Element>this.FarmScreen.element
                );
            },
            destroy: () => {
                this.FarmScreen?.remove();
                this.FarmScreen = null;
                if (appContainer) {
                    appContainer.innerHTML = '';
                }
            },
        };
    }
}