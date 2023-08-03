import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { FarmScene } from "../scenes/Farm.scene";
import { DEFAULT_FARM_STATE, TOOLS } from "../../model/farm.model";
import { ToolComponent } from "../ui-components/Tool.component";
import { ToolsSetWidget } from "../widgets/ToolsSet.widget";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
  toolSeedsData: ToolData;
  toolListData: Array<ToolData>;
}

const createFarmScreenTemplate = () => `
<div class="farm-screen">
    <div class="farm-screen__scene" data-slot-scene></div>
    <div class="farm-screen__aside" data-slot-aside></div>
    <div class="farm-screen__footer" data-slot-footer></div>
</div>
`;
export class FarmScreen extends AbstractScreen {
  protected controllerMethods: Methods = {};
  protected components: ScreenComponents = {
    FarmScene: null,
    Seeds: null,
    ToolsSet: null,
  };
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
    toolSeedsData: {
      name: TOOLS.SEEDS,
      price: 3,
    },
    toolListData: [
      {
        name: TOOLS.SHOVEL,
        price: 0,
      },
      {
        name: TOOLS.BAILER,
        price: 0,
      },
      {
        name: TOOLS.FERTILIZER,
        price: 1,
      },
      {
        name: TOOLS.SPRAYER,
        price: 2,
      },
    ],
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
    this.components.Seeds = new ToolComponent({ tool: this.state.toolSeedsData });
    this.components.ToolsSet = new ToolsSetWidget({
      toolsList: this.state.toolListData,
    });
  }

  protected renderComponents(): void {
    this.mountComponent("scene", this.components.FarmScene);
    this.mountComponent("aside", this.components.Seeds);
    this.mountComponent("footer", this.components.ToolsSet);
  }

  protected setEvents(): void {
    this.components.FarmScene?.emits.setClickEvent((data: Concrete) => {
      this.controllerMethods.updateFarm(data);
    });
    this.components.Seeds?.emits.setClickEvent((tool: Concrete) => {
      this.controllerMethods.setActiveTool(tool);
    });
    this.components.ToolsSet?.emits.setChoiceTool((tool: Concrete) => {
      this.controllerMethods.setActiveTool(tool);
    });
  }

  protected setState(props: Props): void {
    this.state.farm = props.farm;
  }

  get template(): string {
    return createFarmScreenTemplate();
  }

  public remove(): void {
    this.components.FarmScene?.remove();
    super.remove();
  }
}
