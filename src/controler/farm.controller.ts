import { FarmScreen } from "../view/screens/Farm.screen";
import { appContainer, TOOLS } from "../utils/constants";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import FarmModel from "../model/farm.model";
import User from "../model/user.model";
import { updateFarmState } from "../mock/farm.mock";
import { Router } from "../framework/Router";
import Service from "../framework/Service";
import AuthService from "../services/auth.service";

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
        this.FarmScreen = new FarmScreen(
          { farm: farmModel.state },
          this.methods
        );
        const token = Router.getParam("token");
        if (token) {
          try {
            const result = await AuthService.registrationFinalStep(token);
            this.userModel.setUserData(result.user, false);
            Service.setToken(result.jws);
            appContainer?.insertAdjacentElement(
              AbstractView.positions.BEFOREEND,
              <Element>this.FarmScreen.element
            );
          } catch (error: any) {
            alert(
              `Error ${error.response.data.httpErrorCode}: ${error.response.data.httpStatus}`
            );
            Router.push("/#/registration");
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
      updateFarm: async (cell: string) => {
        if (this.farmModel.tool !== TOOLS.EMPTY) {
          const farm: FarmState = await updateFarmState(
            cell,
            this.farmModel.tool
          );
          this.farmModel.setFarmState(farm);
        }
      },
      setActiveTool: (tool: tool) => {
        this.farmModel.setActiveTool(tool);
      },
    };
  }
}
