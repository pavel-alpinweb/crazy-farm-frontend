import { AbstractView } from "../../framework/interface/AbstractView";
import { TOOLS } from "../../utils/constants";
import { eventBus } from "../../main";

interface Props {
  name: tool;
}

interface State {
  name: Props["name"];
  isActive: boolean;
}

const createToolTemplate = (state: State) => `
    <div 
        class="tool 
        tool--${state.name} 
        ${state.isActive ? "tool--active" : ""}"
    ></div>
`;

export class ToolComponent extends AbstractView {
  protected state: State = {
    name: TOOLS.EMPTY,
    isActive: false,
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
    const updateElement = (tool: tool) => {
      this.state.isActive =
        this.state.name === tool && this.state.name !== TOOLS.EMPTY;
      this.rerenderElement();
    };
    eventBus.on("Farm:set_tool", updateElement);
  }

  setHandlers() {
    this.element?.addEventListener("click", () => {
      if (this.events.click) {
        this.events.click(this.state.name);
      }
    });
  }

  protected setState(props: Props): void {
    this.state.name = props.name;
  }

  get template(): string {
    return createToolTemplate(this.state);
  }
}
