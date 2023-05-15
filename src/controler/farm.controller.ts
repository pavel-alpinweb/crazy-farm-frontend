import { FarmScreen } from "../view/screens/Farm.screen";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import {AbstractScreen} from "../framework/interface/AbstractScreen";
import FarmModel from "../model/farm.model";

export default class FarmController {
  private FarmScreen: AbstractScreen | null;
  public methods: Methods = {};

  constructor(farmModel: FarmModel) {
    this.FarmScreen = null;
    this.methods = {
      init: () => {
        this.FarmScreen = new FarmScreen({farm: farmModel.state});
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.FarmScreen.element
        );
      },
      destroy: () => {
        this.FarmScreen?.remove();
        this.FarmScreen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
    };
  }
}
