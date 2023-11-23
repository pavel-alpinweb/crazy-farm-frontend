import { AbstractView } from "../../framework/interface/AbstractView";
import { TOOLS } from "../../model/farm.model";
import { eventBusFarm } from "../../model/farm.model";
import { eventBusAlmanac } from "../../model/almanac.model";

interface Props {
  tool: ToolData;
}

interface State {
  tool: Props["tool"];
  isActive: boolean;
  isHighLight: boolean;
  isBlocked: boolean;
  isTutorialActive: boolean;
}

const createToolTemplate = (state: State) => `
    <div 
        class="tool 
        tool--${state.tool.name} 
        ${state.isActive ? "tool--active" : ""}
        ${state.isBlocked ? "tool--blocked" : ""}
        ${state.isActive ? "tool--highlight" : ""}"
    >
         ${
           state.tool.name !== "almanac"
             ? `<div class="tool__price">${state.tool.price}</div>`
             : ""
         }
    </div>
`;

export class ToolComponent extends AbstractView {
  protected state: State = {
    tool: {
      name: TOOLS.EMPTY,
      price: 0,
    },
    isActive: false,
    isHighLight: false,
    isBlocked: false,
    isTutorialActive: false,
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
      this.updateClassList();
    };
    const highlightElement = (value: boolean) => {
      if (this.state.tool.name === "almanac") return;
      if (this.state.isTutorialActive) return;
      this.state.isHighLight = value;
      this.state.isActive = false;
      this.state.isBlocked = false;
      this.updateClassList();
    };

    const blockedElement = (tutorial: Tutorial) => {
      if (this.state.tool.name !== "almanac" && tutorial.isActive) {
        this.state.isTutorialActive = tutorial.isActive;
        if (tutorial.blockedTools.includes(this.state.tool.name)) {
          this.state.isBlocked = true;
          this.state.isActive = false;
          this.state.isHighLight = false;
        } else {
          this.state.isHighLight = true;
          this.state.isBlocked = false;
        }
      }
      this.updateClassList();
    };
    const endTutorial = () => {
      this.state.isTutorialActive = false;
      this.state.isBlocked = false;
      this.state.isHighLight = false;
      this.updateClassList();
    };
    eventBusFarm.on("Farm:set_tool", updateElement);
    eventBusAlmanac.on("Almanac:activate", highlightElement);
    eventBusAlmanac.on("Tutorial:update", blockedElement);
    eventBusAlmanac.on("Tutorial:end", endTutorial);
  }

  setHandlers() {
    this.element?.addEventListener("click", () => {
      if (this.events.click && !this.state.isBlocked) {
        this.events.click(this.state.tool.name);
      }
    });
  }

  private updateClassList(): void {
    this.state.isActive
      ? this.element?.classList.add("tool--active")
      : this.element?.classList.remove("tool--active");
    this.state.isHighLight
      ? this.element?.classList.add("tool--highlight")
      : this.element?.classList.remove("tool--highlight");
    this.state.isBlocked
      ? this.element?.classList.add("tool--blocked")
      : this.element?.classList.remove("tool--blocked");
  }

  protected setState(props: Props): void {
    this.state.tool = props.tool;
  }

  get template(): string {
    return createToolTemplate(this.state);
  }
}
