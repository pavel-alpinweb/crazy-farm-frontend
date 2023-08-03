import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { DEFAULT_FARM_STATE, TOOLS } from "../../model/farm.model";
import { DevScene } from "../scenes/Dev.scene";
import { ToolComponent } from "../ui-components/Tool.component";
import { ToolsSetWidget } from "../widgets/ToolsSet.widget";

interface State {
  farm: FarmState;
  toolSeedsData: ToolData;
  toolListData: Array<ToolData>;
}

const createDevRoomScreenTemplate = () => `
<div class="dev-room">
    <div class="dev-room__scene" data-slot-scene></div>
    <div class="dev-room__tool" data-slot-tool></div>
    <div class="dev-room__tool-set" data-slot-tool-set></div>
</div>
`;

export class DevRoomScreen extends AbstractScreen {
  protected controllerMethods: Methods = {};
  protected components: ScreenComponents = {
    MainScene: null,
    Tool: null,
    ToolSet: null,
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

  constructor() {
    super();
    this.initComponents();
    this.renderComponents();
  }

  protected initComponents(): void {
    this.components.MainScene = new DevScene({ farm: this.state.farm });
    this.components.Tool = new ToolComponent({ tool: this.state.toolSeedsData });
    this.components.ToolSet = new ToolsSetWidget({
      toolsList: this.state.toolListData,
    });
  }

  protected renderComponents(): void {
    this.mountComponent("scene", this.components.MainScene);
    this.mountComponent("tool", this.components.Tool);
    this.mountComponent("tool-set", this.components.ToolSet);
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
