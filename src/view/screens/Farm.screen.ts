import {AbstractScreen} from "../../framework/interface/AbstractScreen";
import {FarmScene} from "../scenes/Farm.scene";
import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
  title: string,
}

interface State {
  title: string,
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
    title: '',
  };

  constructor() {
    super();
    this.setState({title: 'Farm screen'});
    this.initComponents();
    this.setEvents();
    this.renderComponents();
  }

  protected initComponents(): void {
    this.components.FarmScene = new FarmScene();
  }

  protected renderComponents(): void {
    this.element?.insertAdjacentElement(
        AbstractView.positions.BEFOREEND,
        <Element>this.components.FarmScene?.element
    );
  }

  protected setEvents(): void {
    console.log('setEvents');
  }

  protected setState(props: Props): void {
    this.state.title = props.title;
  }

  get template(): string {
    return createFarmScreenTemplate(this.state);
  }

  public remove(): void {
    this.components.FarmScene?.remove();
    this.renderedElement = null;
  }
}
