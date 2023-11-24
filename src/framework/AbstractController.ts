import { AbstractScreen } from "./interface/AbstractScreen";
import { AbstractStaticScreen } from "./interface/AbstractStaticScreen";
import { appContainer } from "../utils/constants";
import {$loader} from "../main";

export abstract class AbstractController {
  protected abstract Screen: AbstractScreen | AbstractStaticScreen;
  public methods: Methods = {};

  public abstract init(): void;
  public destroy = () => {
    $loader.remove();
    this.Screen?.remove();
    if (appContainer) {
      appContainer.innerHTML = "";
    }
  };
}
