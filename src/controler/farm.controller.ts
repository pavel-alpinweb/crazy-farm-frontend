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
// import { updateTutorial } from "../mock/tutorial.mock";
import Cookies from "js-cookie";
import { AbstractController } from "../framework/AbstractController";
import { AbstractStaticScreen } from "../framework/interface/AbstractStaticScreen";

export default class FarmController extends AbstractController {
  protected Screen!: AbstractScreen | AbstractStaticScreen;
  private readonly farmModel: FarmModel;
  private readonly userModel: User;
  private readonly almanacModel: AlmanacModel;
  private Socket!: Socket;
  constructor(
      farmModel: FarmModel,
      userModel: User,
      almanacModel: AlmanacModel
  ) {
    super();
    this.farmModel = farmModel;
    this.userModel = userModel;
    this.almanacModel = almanacModel;
  }

  public async init(): Promise<void> {
    const registrationToken = Router.getParam("token");
    const userToken = Service.getToken();
    const lang = Cookies.get("crazy-farm-lang") ?? "en";
    await this.methods.setLanguage(<language>lang);
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
        await this.methods.connectToWebSocketServer(userToken);
        // test farm rendering
        // const state = await updateTutorial("1-0", this.farmModel.tool);
        // this.farmModel.setFarmState(state);
        // this.farmModel.setPlayerCash(state.player.cash);
        // $loader.remove();
        this.Screen = new FarmScreen(
          {
            farm: this.farmModel.state,
            player: this.farmModel.player,
            language: this.userModel.language,
          },
          this.methods
        );
        appContainer?.insertAdjacentElement(
          AbstractView.positions.BEFOREEND,
          <Element>this.Screen.element
        );
        // if (
        //     (state.tutorial && state.tutorial.isActive &&
        //         state.tutorial.currentStep !==
        //         this.almanacModel.tutorial.currentStep) ||
        //     (state.tutorial && state.tutorial.isActive &&
        //         this.almanacModel.tutorial.currentStep === 1)
        // ) {
        //   this.almanacModel.setTutorialState(state.tutorial);
        // }
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
          Router.push("/#/welcome");
        }
      }
    }
  }

  methods: Methods = {
      connectToWebSocketServer: async (userToken: string) => {
        try {
          const connectionToken = await FarmService.getJwtForConnection(
            userToken
          );
          this.Socket = new Socket(connectionToken.jws);
          this.Socket.onMessage((data: FarmResponse) => {
            this.farmModel.setFarmState(data);
            this.farmModel.setPlayerCash(data.player.cash);
            if (
                (data.tutorial && data.tutorial.isActive &&
                    data.tutorial.currentStep !==
                    this.almanacModel.tutorial.currentStep) ||
                (data.tutorial && data.tutorial.isActive &&
                    this.almanacModel.tutorial.currentStep === 1)
            ) {
              this.almanacModel.setTutorialState(data.tutorial);
            }
            $loader.remove();
          });
          this.Socket.onClose((event: CloseEvent) => {
            console.warn("Подключение закрыто", event.reason);
            $toaster.show("Подключение закрыто", false);
            Router.push("/#/welcome");
          });
        } catch (error: any) {
          for (const reason of error.response.data.reasons) {
            $toaster.show(`${reason}`, false);
          }
          Router.push("/#/welcome");
        }
      },

      updateFarm: async (cell: string) => {
        if (
          this.farmModel.tool !== TOOLS.EMPTY &&
          !this.almanacModel.state.isActive
        ) {
          this.Socket?.push({ cell, tool: this.farmModel.tool });
          // test farm rendering, make function async
          // const state = await updateTutorial(cell, this.farmModel.tool);
          // this.farmModel.setFarmState(state);
          // this.farmModel.setPlayerCash(state.player.cash);
          // if (
          //   (state.tutorial.isActive &&
          //     state.tutorial.currentStep !==
          //       this.almanacModel.tutorial.currentStep) ||
          //   (state.tutorial.isActive &&
          //     this.almanacModel.tutorial.currentStep === 1)
          // ) {
          //   this.almanacModel.setTutorialState(state.tutorial);
          // }
        } else if (this.almanacModel.state.isActive) {
          const cellData = this.farmModel.state.containers.find(
            (c) => c.name === cell
          );
          if (cellData) {
            this.almanacModel.setAlmanacDataForCharacter(cellData);
          }
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
        this.farmModel.setActiveTool("empty");
      },

      deactivateAlmanac: () => {
        this.almanacModel.deactivateAlmanac();
      },

      setLanguage: (value: language) => {
        this.userModel.setUserLanguage(value);
      },

      showExitMessage: () => {
        this.almanacModel.showExitMessage();
      },

      showRestartMessage: () => {
        this.almanacModel.showRestartMessage();
      },

      exitFromFarm: () => {
        Cookies.remove("crazy-farm-jws");
        this.Socket?.close();
      },

      restartGame: () => {
        this.Socket.push({ commandName: 'resetGame' });
        this.almanacModel.deactivateAlmanac();
      },
  };
}
