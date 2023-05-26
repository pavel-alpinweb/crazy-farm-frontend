import { AbstractView } from "../../framework/interface/AbstractView";

interface Props {
  title: string;
}
interface State {
  isLoading: boolean;
  isDisabled: boolean;
  title: Props["title"];
}

const createButtonTemplate = (state: State) => `
<button class="button" type="button" ${
  state.isDisabled || state.isLoading ? "disabled" : ""
}>
    ${state.isLoading ? "Loading..." : state.title}
</button>
`;

export class ButtonComponent extends AbstractView {
  protected state: State = {
    isLoading: false,
    isDisabled: false,
    title: "Отправить",
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }
  protected setState(props: Props) {
    this.state.title = props.title;
  }

  protected setEvents(): void {
    this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
      this.events.click = callback;
    };
  }
  setHandlers() {
    this.element?.addEventListener("click", (event) => {
      event.preventDefault();
      this.state.isLoading = true;
      this.rerenderElement();
      this.events.click("Click button!");
    });
  }
  get template(): string {
    return createButtonTemplate(this.state);
  }
}
