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
import FarmService from "../services/farm.service";

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
        const registrationToken = Router.getParam("token");
        const userToken = Service.getToken();
        try {
          if (registrationToken) {
            const result = await AuthService.registrationFinalStep(registrationToken);
            this.userModel.setUserData(result.user, false);
            Service.setToken(result.jws);
            const connectionToken = await FarmService.getJwtForConnection(result.jws);
            console.log('connectionToken', connectionToken);
          } else if (userToken) {
            const connectionToken = await FarmService.getJwtForConnection(userToken);
            console.log('connectionToken', connectionToken);
          } else {
            alert('Пройдите регистрацию');
            Router.push("/#/registration");
          }
          this.FarmScreen = new FarmScreen(
              { farm: farmModel.state },
              this.methods
          );
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
