import { AbstractView } from "../../framework/interface/AbstractView";
import { TOOLS } from "../../model/farm.model";
import { eventBusFarm } from "../../model/farm.model";

interface Props {
  tool: ToolData;
}

interface State {
  tool: Props["tool"];
  isActive: boolean;
}

const createToolTemplate = (state: State) => `
    <div 
        class="tool 
        tool--${state.tool.name} 
        ${state.isActive ? "tool--active" : ""}"
    >
        <div class="tool__price">${state.tool.price}</div>
    </div>
`;

export class ToolComponent extends AbstractView {
  protected state: State = {
    tool: {
      name: TOOLS.EMPTY,
      price: 0,
    },
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
        this.state.tool.name === tool && this.state.tool.name !== TOOLS.EMPTY;
      this.state.isActive
        ? this.element?.classList.add("tool--active")
        : this.element?.classList.remove("tool--active");
    };
    eventBusFarm.on("Farm:set_tool", updateElement);
  }

  setHandlers() {
    this.element?.addEventListener("click", () => {
      if (this.events.click) {
        this.events.click(this.state.tool.name);
      }
    });
  }

  protected setState(props: Props): void {
    this.state.tool = props.tool;
  }

  get template(): string {
    return createToolTemplate(this.state);
  }
}
