import { FarmScreen } from "../view/screens/Farm.screen";
import { appContainer } from "../utils/constants";
import { TOOLS } from "../model/farm.model";
import { AbstractView } from "../framework/interface/AbstractView";
import { AbstractScreen } from "../framework/interface/AbstractScreen";
import FarmModel from "../model/farm.model";
import User from "../model/user.model";
import { AlmanacModel } from "../model/almanac.model";
import { Router } from "../framework/Router";
import Service from "../framework/Service";
import AuthService from "../services/auth.service";
import FarmService from "../services/farm.service";
import Socket from "../framework/Socket";
import { $toaster, farmAssetsLoader, $loader } from "../main";
import {updateTutorial} from "../mock/tutorial.mock";

export default class FarmController {
  private readonly farmModel: FarmModel;
  private readonly userModel: User;
  private readonly almanacModel: AlmanacModel;
  private Socket!: Socket;
  private FarmScreen: AbstractScreen | null;
  public methods: Methods = {};

  constructor(
    farmModel: FarmModel,
    userModel: User,
    almanacModel: AlmanacModel
  ) {
    this.farmModel = farmModel;
    this.userModel = userModel;
    this.almanacModel = almanacModel;
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
            $loader.show();
            await farmAssetsLoader.load();
            // await this.methods.connectToWebSocketServer(userToken);
            // test farm rendering
            const state = await updateTutorial("0-0", this.farmModel.tool);
            this.farmModel.setFarmState(state);
            this.farmModel.setPlayerCash(state.player.cash);
            $loader.remove();
            this.FarmScreen = new FarmScreen(
              { farm: farmModel.state, player: farmModel.player },
              this.methods
            );
            appContainer?.insertAdjacentElement(
              AbstractView.positions.BEFOREEND,
              <Element>this.FarmScreen.element
            );
          } else {
            $toaster.show("Авторизуйтесь", false);
            Router.push("/#/welcome");
          }
        } catch (error: any) {
          if (!error.response) {
            console.error("farm controller error:", error);
          } else if (error?.response?.data?.httpErrorCode === 401) {
            $toaster.show("Авторизуйтесь", false);
            Router.push("/#/welcome");
          } else {
            for (const reason of error.response.data.reasons) {
              $toaster.show(`${reason}`, false);
            }
          }
        }
      },
      destroy: () => {
        this.Socket?.close();
        $loader.remove();
        this.FarmScreen?.remove();
        this.FarmScreen = null;
        if (appContainer) {
          appContainer.innerHTML = "";
        }
      },
      updateFarm: async (cell: string) => {
        if (
          this.farmModel.tool !== TOOLS.EMPTY &&
          !this.almanacModel.state.isActive
        ) {
          // this.Socket?.push({ cell, tool: this.farmModel.tool });
          // test farm rendering, make function async
          const state = await updateTutorial(cell, this.farmModel.tool);
          this.farmModel.setFarmState(state);
          this.farmModel.setPlayerCash(state.player.cash);
        } else if (this.almanacModel.state.isActive) {
          const cellData = this.farmModel.state.containers.find(
            (c) => c.name === cell
          );
          if (cellData) {
            this.almanacModel.setAlmanacDataForCharacter(cellData);
          }
        }
      },
      connectToWebSocketServer: async (userToken: string) => {
        try {
          const connectionToken = await FarmService.getJwtForConnection(
            userToken
          );
          this.Socket = new Socket(connectionToken.jws);
          this.Socket.onMessage((data: FarmResponse) => {
            this.farmModel.setFarmState(data);
            this.farmModel.setPlayerCash(data.player.cash);
            $loader.remove();
          });
          this.Socket.onClose((event: CloseEvent) => {
            console.warn("Подключение закрыто", event.reason);
          });
        } catch (error: any) {
          for (const reason of error.response.data.reasons) {
            $toaster.show(`${reason}`, false);
          }
          Router.push("/#/welcome");
        }
      },
      setActiveTool: (tool: tool) => {
        if (this.almanacModel.state.isActive) {
          this.almanacModel.setAlmanacDataForTools(tool);
        } else {
          this.farmModel.setActiveTool(tool);
        }
      },
      toggleAlmanac: () => {
        this.almanacModel.toggleAlmanac();
      },
      activateAlmanac: () => {
        this.almanacModel.activateAlmanac();
      },
      deactivateAlmanac: () => {
        this.almanacModel.deactivateAlmanac();
      },
    };
  }
}
