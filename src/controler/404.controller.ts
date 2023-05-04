import { AbstractStaticScreen } from "../framework/interface/AbstractStaticScreen";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { Error404Screen } from "../view/screens/404.screen";

export default class Error404ScreenController {
  private Error404Screen: AbstractStaticScreen | null;
  public methods: Methods = {};

  constructor() {
    this.Error404Screen = null;
    this.methods = {
      init: () => {
        this.Error404Screen = new Error404Screen();
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.Error404Screen.element
        );
      },
      destroy: () => {
        this.Error404Screen?.remove();
        this.Error404Screen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
    };
  }
}
