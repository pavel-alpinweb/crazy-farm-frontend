import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { FarmScene } from "../scenes/Farm.scene";
import { DEFAULT_FARM_STATE, TOOLS } from "../../model/farm.model";
import { ToolComponent } from "../ui-components/Tool.component";
import { ToolsSetWidget } from "../widgets/ToolsSet.widget";
import { WalletComponent } from "../ui-components/Wallet.component";
import { TOOLS_PRICES } from "../../model/farm.model";
import {AbstractView} from "../../framework/interface/AbstractView";
import {AlmanacComponent} from "../ui-components/Almanac.component";

interface Props {
  farm: FarmState;
  player: Player;
}

interface State {
  farm: Props["farm"];
  toolSeedsData: ToolData;
  toolAlmanacData: ToolData;
  toolListData: Array<ToolData>;
  player: Props["player"];
}

const createFarmScreenTemplate = () => `
<div class="farm-screen">
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
  };
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
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
    player: {
      cash: 0,
    },
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
      currentTextKey: 'tools.shovel',
    });
    this.components.ToolsSet = new ToolsSetWidget({
      toolsList: this.state.toolListData,
    });
    this.components.Wallet = new WalletComponent({
      cash: this.state.player.cash,
    });
  }

  protected renderComponents(): void {
    this.mountComponent("scene", this.components.FarmScene);
    this.mountComponent("aside", this.components.Seeds);
    this.mountComponent("aside", this.components.AlmanacTrigger, AbstractView.positions.BEFOREEND);
    this.mountComponent("footer", this.components.ToolsSet);
    this.mountComponent("footer", this.components.Almanac, AbstractView.positions.BEFOREEND);
    this.mountComponent("wallet", this.components.Wallet);
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
      this.controllerMethods.toggleAlmanac();
    });

    this.components.Almanac?.emits.setActivateClickEvent(() => {
      this.controllerMethods.activateAlmanac();
    });
  }

  protected setState(props: Props): void {
    this.state.farm = props.farm;
    this.state.player = props.player;
  }

  get template(): string {
    return createFarmScreenTemplate();
  }

  public remove(): void {
    this.components.FarmScene?.remove();
    super.remove();
  }
}
