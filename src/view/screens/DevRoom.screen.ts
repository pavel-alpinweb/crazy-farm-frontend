import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { DevScene } from "../scenes/Dev.scene";
import { ToolComponent } from "../ui-components/Tool.component";
import { ToolsSetWidget } from "../widgets/ToolsSet.widget";
import { TOOLS_PRICES } from "../../model/farm.model";
import { WalletComponent } from "../ui-components/Wallet.component";
import { TextInputComponent } from "../ui-components/TextInput.component";
import { PageHeaderComponent } from "../ui-components/PageHeader.component";
import { TEST_FARM_STATE, TOOLS } from "../../model/devRoom.model";

interface State {
  farm: FarmState;
  player: Player;
  toolSeedsData: ToolData;
  toolListData: Array<ToolData>;
}

const createDevRoomScreenTemplate = () => `
<div class="dev-room">
     <div class="dev-room__test-scene">
        <div class="dev-room__scene" data-slot-scene></div>
     </div>
     <div class="dev-room__ui-kit">
        <h1 class="dev-room__heading">Ui Kit</h1>
        <div class="dev-room__ui-kit__wrapper">
            <div class="dev-room__ui-kit__item" data-slot-wallet></div>
            <div class="dev-room__ui-kit__item" data-slot-tool></div>
            <div class="dev-room__ui-kit__item" data-slot-tool-set></div>
            <div class="dev-room__ui-kit__item">
                <button class="button">Action</button>
                <br>
                <br>
                <button class="button green">Action</button>
                <br>
                <br>
                <button class="button brown">Action</button>
                <br>
                <br>
                <button class="button green big">Action</button>
            </div>
            <div class="dev-room__ui-kit__item" data-slot-input></div>
            <div class="dev-room__ui-kit__item" data-slot-header></div>
        </div>
     </div>
</div>
`;

export class DevRoomScreen extends AbstractScreen {
  protected controllerMethods: Methods = {};
  protected components: ScreenComponents = {
    MainScene: null,
    Tool: null,
    ToolSet: null,
    Wallet: null,
    TextInput: null,
    PageHeader: null,
  };
  protected state: State = {
    farm: TEST_FARM_STATE,
    player: {
      cash: 1000,
    },
    toolSeedsData: {
      name: TOOLS.SEEDS,
      price: TOOLS_PRICES[TOOLS.SEEDS],
    },
    toolListData: [
      {
        name: TOOLS.SHOVEL,
        price: TOOLS_PRICES[TOOLS.SHOVEL],
      },
      {
        name: TOOLS.BAILER,
        price: TOOLS_PRICES[TOOLS.BAILER],
      },
      {
        name: TOOLS.FERTILIZER,
        price: TOOLS_PRICES[TOOLS.FERTILIZER],
      },
      {
        name: TOOLS.SPRAYER,
        price: TOOLS_PRICES[TOOLS.SPRAYER],
      },
    ],
  };

  constructor() {
    super();
    this.initComponents();
    this.renderComponents();
  }

  protected initComponents(): void {
    this.components.MainScene = new DevScene({ farm: this.state.farm });
    this.components.Tool = new ToolComponent({
      tool: this.state.toolSeedsData,
    });
    this.components.ToolSet = new ToolsSetWidget({
      toolsList: this.state.toolListData,
    });
    this.components.Wallet = new WalletComponent({
      cash: this.state.player.cash,
    });
    this.components.TextInput = new TextInputComponent({
      value: "",
      placeholder: "***",
      icon: "user",
      isPassword: false,
      translationKey: "loginPlaceholder",
    });
    this.components.PageHeader = new PageHeaderComponent({
      title: "Регистрация",
    });
  }

  protected renderComponents(): void {
    this.mountComponent("scene", this.components.MainScene);
    this.mountComponent("tool", this.components.Tool);
    this.mountComponent("tool-set", this.components.ToolSet);
    this.mountComponent("wallet", this.components.Wallet);
    this.mountComponent("input", this.components.TextInput);
    this.mountComponent("header", this.components.PageHeader);
  }

  protected setEvents(): void {
    console.warn("Init: DevRoom Events");
  }

  protected setState(): void {
    console.warn("Init: DevRoom state");
  }

  get template(): string {
    return createDevRoomScreenTemplate();
  }

  public remove(): void {
    this.components.MainScene?.remove();
    super.remove();
  }
}
