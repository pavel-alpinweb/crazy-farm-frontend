import { AbstractScreen } from "./interface/AbstractScreen";
import { AbstractStaticScreen } from "./interface/AbstractStaticScreen";
import { appContainer } from "../utils/constants";

export abstract class AbstractController {
  protected abstract Screen: AbstractScreen | AbstractStaticScreen;
  public methods: Methods = {};

  public abstract init(): void;
  public destroy = () => {
    this.Screen?.remove();
    if (appContainer) {
      appContainer.innerHTML = "";
    }
  };
}
