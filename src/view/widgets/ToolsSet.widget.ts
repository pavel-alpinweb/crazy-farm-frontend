import { AbstractWidget } from "../../framework/interface/AbstractWidget";
import { ToolComponent } from "../ui-components/Tool.component";

interface Props {
  toolsList: Array<ToolData>;
}

interface State {
  toolsList: Props["toolsList"];
}

const createToolsListTemplate = () => `
<div class="tools-set">
    <div class="tools-set__container" data-slot-tools-list></div>
</div>
`;

export class ToolsSetWidget extends AbstractWidget {
  protected components: WidgetComponents = {};
  protected state: State = {
    toolsList: [],
  };

  constructor(props: Props) {
    super();
    this.setState(props);
    this.initComponents();
    this.setEvents();
    this.renderComponents();
  }

  protected initComponents(): void {
    this.state.toolsList.forEach((tool: ToolData) => {
      this.components[`Tool_${tool.name}`] = new ToolComponent({tool});
    });
  }

  protected renderComponents(): void {
    Object.keys(this.components).forEach((Component) => {
      this.mountComponent("tools-list", this.components[Component]);
    });
  }

  protected setEvents(): void {
    this.emits.setChoiceTool = (callback: (data: Concrete) => void) => {
      this.events.choiceTool = callback;
    };
    Object.keys(this.components).forEach((Component) => {
      this.components[Component]?.emits.setClickEvent((name: Concrete) => {
        this.events.choiceTool(name);
      });
    });
  }

  protected setState(props: Props) {
    this.state.toolsList = props.toolsList;
  }

  get template(): string {
    return createToolsListTemplate();
  }
}
