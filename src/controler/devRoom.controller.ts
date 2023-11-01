import { AbstractScreen } from "../framework/interface/AbstractScreen";
import { appContainer } from "../utils/constants";
import { DevRoomScreen } from "../view/screens/DevRoom.screen";
import { AbstractView } from "../framework/interface/AbstractView";
import { Toaster } from "../framework/interface/Toaster";
import { farmAssetsLoader, $loader } from "../main";

export default class DevRoomController {
  private DevRoomScreen: AbstractScreen | null;
  public methods: Methods = {};
  private $testToaster = new Toaster(1000);

  constructor() {
    this.DevRoomScreen = null;
    this.methods = {
      init: async () => {
        $loader.show();
        await farmAssetsLoader.load();
        this.DevRoomScreen = new DevRoomScreen();
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.DevRoomScreen.element
        );
        $loader.remove();
        this.$testToaster.show("Авторизуйтесь", false);
        this.$testToaster.show("Авторизуйтесь", true);
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
