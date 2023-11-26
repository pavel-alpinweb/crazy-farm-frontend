import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { FarmScene } from "../scenes/Farm.scene";
import { DEFAULT_FARM_STATE, TOOLS } from "../../model/farm.model";
import { ToolComponent } from "../ui-components/Tool.component";
import { ToolsSetWidget } from "../widgets/ToolsSet.widget";
import { WalletComponent } from "../ui-components/Wallet.component";
import { TOOLS_PRICES } from "../../model/farm.model";
import { AbstractView } from "../../framework/interface/AbstractView";
import { AlmanacComponent } from "../ui-components/Almanac.component";
import { LanguageSwitcherComponent } from "../ui-components/LanguageSwitcher.component";
import { HOT_KEYS } from "../../utils/constants";
import { eventBusAlmanac } from "../../model/almanac.model";

interface Props {
  farm: FarmState;
  player: Player;
  language: language;
  isTutorialActive: boolean;
}

interface State {
  farm: Props["farm"];
  toolSeedsData: ToolData;
  toolAlmanacData: ToolData;
  toolListData: Array<ToolData>;
  player: Props["player"];
  language: Props["language"];
  isTutorialActive: Props["isTutorialActive"];
}

const createLeaveButtonsTemplate = (isTutorialActive: boolean) => `
  <button class="button brown exit" data-exit></button>
    ${
      !isTutorialActive
        ? `<button class="button brown restart" data-restart></button>`
        : ""
    }
`;

const createFarmScreenTemplate = (state: State) => `
<div class="farm-screen">
    <div class="farm-screen__restart-btns">
        ${createLeaveButtonsTemplate(state.isTutorialActive)}
    </div>
    <div class="farm-screen__scene" data-slot-scene></div>
    <div class="farm-screen__wallet" data-slot-wallet></div>
    <div class="farm-screen__aside" data-slot-aside></div>
    <div class="farm-screen__footer" data-slot-footer></div>
</div>
`;
export class FarmScreen extends AbstractScreen {
  protected controllerMethods: Methods = {};
  protected components: ScreenComponents = {
    FarmScene: null,
    Seeds: null,
    AlmanacTrigger: null,
    Almanac: null,
    ToolsSet: null,
    Wallet: null,
    LanguageSwitcherComponent: null,
  };
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
    language: "en",
    toolSeedsData: {
      name: TOOLS.SEEDS,
      price: TOOLS_PRICES[TOOLS.SEEDS],
    },
    toolAlmanacData: {
      name: TOOLS.ALMANAC,
      price: TOOLS_PRICES[TOOLS.ALMANAC],
    },
    toolListData: [
      {
        name: TOOLS.SHOVEL,
        price: TOOLS_PRICES[TOOLS.SHOVEL],
        key: 1,
      },
      {
        name: TOOLS.BAILER,
        price: TOOLS_PRICES[TOOLS.BAILER],
        key: 2,
      },
      {
        name: TOOLS.FERTILIZER,
        price: TOOLS_PRICES[TOOLS.FERTILIZER],
        key: 3,
      },
      {
        name: TOOLS.SPRAYER,
        price: TOOLS_PRICES[TOOLS.SPRAYER],
        key: 4,
      },
    ],
    player: {
      cash: 0,
    },
    isTutorialActive: false,
  };

  constructor(props: Props, methods: Methods) {
    super();
    this.controllerMethods = methods;
    this.setState(props);
    this.initComponents();
    this.renderComponents();
    this.setEvents();
  }

  protected initComponents(): void {
    this.components.FarmScene = new FarmScene({ farm: this.state.farm });
    this.components.Seeds = new ToolComponent({
      tool: this.state.toolSeedsData,
    });
    this.components.AlmanacTrigger = new ToolComponent({
      tool: this.state.toolAlmanacData,
    });
    this.components.Almanac = new AlmanacComponent({
      isShow: false,
      isActive: false,
      currentActions: [],
      currentTextKey: "almanacDefault",
    });
    this.components.ToolsSet = new ToolsSetWidget({
      toolsList: this.state.toolListData,
    });
    this.components.Wallet = new WalletComponent({
      cash: this.state.player.cash,
    });
    this.components.LanguageSwitcherComponent = new LanguageSwitcherComponent({
      activeLanguage: this.state.language,
    });
  }

  protected renderComponents(): void {
    this.mountComponent("scene", this.components.FarmScene);
    this.mountComponent("aside", this.components.Seeds);
    this.mountComponent(
      "aside",
      this.components.AlmanacTrigger,
      AbstractView.positions.BEFOREEND
    );
    this.mountComponent("footer", this.components.ToolsSet);
    this.mountComponent(
      "footer",
      this.components.Almanac,
      AbstractView.positions.BEFOREEND
    );
    this.mountComponent("wallet", this.components.Wallet);
    this.mountComponent(
      "wallet",
      this.components.LanguageSwitcherComponent,
      AbstractView.positions.BEFOREEND
    );
  }

  protected setEvents(): void {
    this.components.FarmScene?.emits.setClickEvent((data: Concrete) => {
      this.controllerMethods.updateFarm(data);
    });
    this.components.Seeds?.emits.setClickEvent((tool: Concrete) => {
      this.controllerMethods.setActiveTool(tool);
    });
    this.components.AlmanacTrigger?.emits.setClickEvent(() => {
      this.controllerMethods.toggleAlmanac();
    });
    this.components.ToolsSet?.emits.setChoiceTool((tool: Concrete) => {
      this.controllerMethods.setActiveTool(tool);
    });
    this.components.Almanac?.emits.setUnderstandClickEvent(() => {
      this.controllerMethods.deactivateAlmanac();
    });
    this.components.Almanac?.emits.setActivateClickEvent(() => {
      this.controllerMethods.activateAlmanac();
    });
    this.components.Almanac?.emits.setExitClickEvent(() => {
      this.controllerMethods.exitFromFarm();
    });
    this.components.Almanac?.emits.setRestartClickEvent(() => {
      this.controllerMethods.restartGame();
    });
    this.components.LanguageSwitcherComponent?.emits.setClickEvent(
      (lang: Concrete) => {
        this.controllerMethods.setLanguage(lang);
      }
    );

    const toggleBtns = (data: Tutorial) => {
      const container = <HTMLElement>(
        this.element?.querySelector(".farm-screen__restart-btns")
      );
      container.innerHTML = createLeaveButtonsTemplate(data.isActive);
      this.setHandlers();
    };
    document.addEventListener("keyup", this.changeTool);

    eventBusAlmanac.off("Tutorial:update", toggleBtns);
    eventBusAlmanac.on("Tutorial:update", toggleBtns);
    eventBusAlmanac.on("Tutorial:end", toggleBtns);
    eventBusAlmanac.on("Tutorial:end", toggleBtns);
  }

  private changeTool = (e: KeyboardEvent) => {
    const hotKey = HOT_KEYS.find((command) => command.key === Number(e.key));
    if (hotKey) {
      this.controllerMethods.setActiveTool(hotKey.tool);
    }
  };

  setHandlers() {
    const exitBtn = <HTMLElement>this.element?.querySelector("[data-exit]");
    const restartBtn = <HTMLElement>(
      this.element?.querySelector("[data-restart]")
    );

    exitBtn.addEventListener("click", () => {
      this.controllerMethods.showExitMessage();
    });

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        this.controllerMethods.showRestartMessage();
      });
    }
  }

  protected setState(props: Props): void {
    this.state.farm = props.farm;
    this.state.player = props.player;
    this.state.language = props.language;
    this.state.isTutorialActive = props.isTutorialActive;
  }

  get template(): string {
    return createFarmScreenTemplate(this.state);
  }

  public remove(): void {
    document.removeEventListener("keyup", this.changeTool);
    this.components.FarmScene?.remove();
    super.remove();
  }
}
