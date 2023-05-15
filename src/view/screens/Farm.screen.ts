import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { FarmScene } from "../scenes/Farm.scene";
import { AbstractView } from "../../framework/interface/AbstractView";

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
  protected components: ScreenComponents = {
    FarmScene: null,
  };
  protected state: State = {
    title: "Farm, sweet Farm",
    farm: {
      containers: {
        central: {
          isEmpty: true,
          isBlocked: true,
          character: {
            type: "potato",
            stage: 1,
          },
        },
      },
    },
  };

  constructor(props: Props) {
    super();
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
