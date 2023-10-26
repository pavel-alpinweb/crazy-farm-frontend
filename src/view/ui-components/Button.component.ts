import { AbstractView } from "../../framework/interface/AbstractView";
import { eventBusUser } from "../../model/user.model";
interface Props {
  title: string;
}
interface State {
  isLoading: boolean;
  isDisabled: boolean;
  title: Props["title"];
}

const createButtonTemplate = (state: State) => `
<button class="button green" type="button" ${
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
      this.events.click("Click button!");
    });
    const setLoading = (value: boolean) => {
      this.state.isLoading = value;
      this.rerenderElement();
    };
    eventBusUser.off("User:loading", setLoading);
    eventBusUser.on("User:loading", setLoading);
  }
  get template(): string {
    return createButtonTemplate(this.state);
  }
}
