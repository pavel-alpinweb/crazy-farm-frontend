import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { FarmScene } from "../scenes/Farm.scene";
import { AbstractView } from "../../framework/interface/AbstractView";
import {DEFAULT_FARM_STATE} from "../../utils/constants";

interface Props {
  farm: FarmState;
}

interface State {
  title: string;
  farm: Props["farm"];
}

const createFarmScreenTemplate = (state: State) => `
<div class="farm-screen">
    <h1>${state.title}</h1>
</div>
`;
export class FarmScreen extends AbstractScreen {
  private controllerMethods: Methods = {};
  protected components: ScreenComponents = {
    FarmScene: null,
  };
  protected state: State = {
    title: "Farm, sweet Farm",
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
    this.components.FarmScene = new FarmScene({farm: this.state.farm});
  }

  protected renderComponents(): void {
    this.element?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.components.FarmScene?.element
    );
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
    return createFarmScreenTemplate(this.state);
  }

  public remove(): void {
    this.components.FarmScene?.remove();
    super.remove();
  }
}
