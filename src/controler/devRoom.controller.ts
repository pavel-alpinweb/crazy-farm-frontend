import { appContainer } from "../utils/constants";
import { DevRoomScreen } from "../view/screens/DevRoom.screen";
import { AbstractView } from "../framework/interface/AbstractView";
import { Toaster } from "../framework/interface/Toaster";
import { farmAssetsLoader, $loader } from "../main";
import { AbstractController } from "../framework/AbstractController";
import {AbstractScreen} from "../framework/interface/AbstractScreen";
import {AbstractStaticScreen} from "../framework/interface/AbstractStaticScreen";

export default class DevRoomController extends AbstractController {
  protected Screen!: AbstractScreen | AbstractStaticScreen;
  private $testToaster = new Toaster(1000);

  public init = async () => {
    $loader.show();
    await farmAssetsLoader.load();
    this.Screen = new DevRoomScreen();
    appContainer?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.Screen.element
    );
    $loader.remove();
    this.$testToaster.show("Авторизуйтесь", false);
    this.$testToaster.show("Авторизуйтесь", true);
  };
}
