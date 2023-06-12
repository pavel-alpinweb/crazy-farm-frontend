import { FarmScreen } from "../view/screens/Farm.screen";
import { appContainer } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import FarmModel from "../model/farm.model";
import { updateFarmState } from "../mock/farm.mock";
import {Router} from "../framework/Router";
import Service from "../framework/Service";
import {registrationFinalStep} from "../mock/auth.mock";
import User from "../model/user.model";

export default class FarmController {
  private readonly farmModel: FarmModel;
  private readonly userModel: User;
  private FarmScreen: AbstractScreen | null;
  public methods: Methods = {};

  constructor(farmModel: FarmModel, userModel: User) {
    this.farmModel = farmModel;
    this.userModel = userModel;
    this.FarmScreen = null;
    this.methods = {
      init: async () => {
        const token = Router.getParam('token');
        this.FarmScreen = new FarmScreen(
            { farm: farmModel.state },
            this.methods
        );
        if (token) {
          try {
            const result = await registrationFinalStep(token, true);
            this.userModel.setUserData(result.user, false);
            Service.setToken(result.jws);
            appContainer?.insertAdjacentElement(
                AbstractView.positions.BEFOREEND,
                <Element>this.FarmScreen.element
            );
          } catch (error) {
            if (Service.instanceOfHttpError(error)) {
              alert(`Error ${error.httpErrorCode}: ${error.httpStatus}`);
            }
            Router.push('/#/registration');
          }
        } else {
          appContainer?.insertAdjacentElement(
              AbstractView.positions.BEFOREEND,
              <Element>this.FarmScreen.element
          );
        }
      },
      destroy: () => {
        this.FarmScreen?.remove();
        this.FarmScreen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
      updateFarm: async () => {
        const farm: FarmState = await updateFarmState();
        this.farmModel.setFarmState(farm);
      },
    };
  }
}
