import {AbstractScreen} from "../framework/interface/AbstractScreen";
import {appContainer} from "../utils/constants";
import {DevRoomScreen} from "../view/screens/DevRoom.screen";
import {AbstractView} from "../framework/interface/AbstractView";

export default class DevRoomController {
    private DevRoomScreen: AbstractScreen | null;
    public methods: Methods = {};

    constructor() {
        this.DevRoomScreen = null;
        this.methods = {
            init: () => {
                this.DevRoomScreen = new DevRoomScreen();
                appContainer?.insertAdjacentElement(
                    AbstractView.positions.BEFOREEND,
                    <Element>this.DevRoomScreen.element
                );
            },
            destroy: () => {
                this.DevRoomScreen?.remove();
                this.DevRoomScreen = null;
                if (appContainer) {
                    appContainer.innerHTML = "";
                }
            },
        };
    }
}