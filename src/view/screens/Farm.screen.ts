import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { FarmScene } from "../scenes/Farm.scene";
import { DEFAULT_FARM_STATE } from "../../utils/constants";

interface Props {
  farm: FarmState;
}

interface State {
  farm: Props["farm"];
}

const createFarmScreenTemplate = () => `
<div class="farm-screen">
    <div class="farm-screen__scene" data-slot-scene></div>
</div>
`;
export class FarmScreen extends AbstractScreen {
  protected controllerMethods: Methods = {};
  protected components: ScreenComponents = {
    FarmScene: null,
  };
  protected state: State = {
    farm: DEFAULT_FARM_STATE,
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
  }

  protected renderComponents(): void {
    this.mountComponent('scene', this.components.FarmScene);
  }

  protected setEvents(): void {
    this.components.FarmScene?.emits.setClickEvent((data: Concrete) => {
      console.log("Ты жмакнул по ячейке: ", data);
      this.controllerMethods.updateFarm();
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
