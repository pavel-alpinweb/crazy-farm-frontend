import { FarmScreen } from "../view/screens/Farm.screen";
import { appContainer } from "../utils/constants";
import { TOOLS } from "../model/farm.model";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import FarmModel from "../model/farm.model";
import User from "../model/user.model";
// import { updateFarmState } from "../mock/farm.mock";
import { Router } from "../framework/Router";
import Service from "../framework/Service";
import AuthService from "../services/auth.service";
import FarmService from "../services/farm.service";
import Socket from "../framework/Socket";

export default class FarmController {
  private readonly farmModel: FarmModel;
  private readonly userModel: User;
  private Socket!: Socket;
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
            const result = await AuthService.registrationFinalStep(
              registrationToken
            );
            this.userModel.setUserData(result.user, false);
            Service.setToken(result.jws);
            Router.push("/#/");
          } else if (userToken) {
            await this.methods.connectToWebSocketServer(userToken);
            this.FarmScreen = new FarmScreen(
              { farm: farmModel.state },
              this.methods
            );
            appContainer?.insertAdjacentElement(
              AbstractView.positions.BEFOREEND,
              <Element>this.FarmScreen.element
            );
          } else {
            alert("Авторизуйтесь");
            Router.push("/#/login");
          }
        } catch (error: any) {
          console.error("Farm controller init error:", error.response);
          if (error.response.data.httpErrorCode === 401) {
            alert("Авторизуйтесь");
            Router.push("/#/login");
          } else {
            alert(
              `Error ${error.response.data.httpErrorCode}: ${error.response.data.httpStatus}`
            );
          }
        }
      },
      destroy: () => {
        this.Socket?.close();
        this.FarmScreen?.remove();
        this.FarmScreen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
      updateFarm: (cell: string) => {
        if (this.farmModel.tool !== TOOLS.EMPTY) {
          this.Socket?.push({ cell, tool: this.farmModel.tool });
          // test farm rendering, make function async
          // const state = await updateFarmState(cell, this.farmModel.tool);
          // this.farmModel.setFarmState(state);
        }
      },
      connectToWebSocketServer: async (userToken: string) => {
        try {
          const connectionToken = await FarmService.getJwtForConnection(
            userToken
          );
          this.Socket = new Socket(connectionToken.jws);
          this.Socket.onMessage((data: Concrete) => {
            this.farmModel.setFarmState(<FarmState>data);
          });
          this.Socket.onClose((event: CloseEvent) => {
            console.warn("Подключение закрыто", event.reason);
          });
        } catch (error: any) {
          alert(
            `Error ${error.response.data.httpErrorCode}: ${error.response.data.httpStatus}`
          );
          Router.push("/#/login");
        }
      },
      setActiveTool: (tool: tool) => {
        this.farmModel.setActiveTool(tool);
      },
    };
  }
}
