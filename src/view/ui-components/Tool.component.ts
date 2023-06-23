import { AbstractView } from "../../framework/interface/AbstractView";

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
    name: "empty",
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
  }

  setHandlers() {
      this.element?.addEventListener("click", () => {
          if (this.events.click) {
              this.events.click(this.state.name);
          }
          this.state.isActive = !this.state.isActive;
          this.rerenderElement();
      });
  }

    protected setState(props: Props): void {
    this.state.name = props.name;
  }

  get template(): string {
    return createToolTemplate(this.state);
  }
}
