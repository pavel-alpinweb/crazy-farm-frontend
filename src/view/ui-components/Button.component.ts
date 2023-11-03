import { AbstractView } from "../../framework/interface/AbstractView";
import { eventBusUser } from "../../model/user.model";
import {$t} from "../../utils/helpers";
interface Props {
  translationKey: string;
}
interface State {
  isLoading: boolean;
  isDisabled: boolean;
  title: string;
  translationKey: Props["translationKey"];
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
    translationKey: '',
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }
  protected setState(props: Props) {
    this.state.title = $t(props.translationKey);
    this.state.translationKey = props.translationKey;
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
    const setLanguage = () => {
      this.state.title = $t(this.state.translationKey);
      this.rerenderElement();
    };

    eventBusUser.off("User:language", setLanguage);
    eventBusUser.on("User:language", setLanguage);
    eventBusUser.off("User:loading", setLoading);
    eventBusUser.on("User:loading", setLoading);
  }
  get template(): string {
    return createButtonTemplate(this.state);
  }
}
