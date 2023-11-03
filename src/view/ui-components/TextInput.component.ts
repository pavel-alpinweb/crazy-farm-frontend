import { AbstractView } from "../../framework/interface/AbstractView";
import { $t } from "../../utils/helpers";
import { eventBusUser } from "../../model/user.model";

interface Props {
  value: string;
  placeholder: string;
  isDisabled?: boolean;
  icon?: string;
  isPassword: boolean;
  translationKey: string;
}

interface State {
  value: Props["value"];
  placeholder: Props["placeholder"];
  isPassword: Props["isPassword"];
  isDisabled: boolean | Props["isDisabled"];
  icon: null | Props["icon"];
  translationKey: Props["translationKey"];
}

const createTextInputTemplate = (state: State) => `
<div class="text-input-container">
    <input
        class=
            "text-input
            ${
              state.icon
                ? `text-input--icon text-input--icon-${state.icon}`
                : ""
            }
            "
        type="${state.isPassword ? "password" : "text"}"
        name="${state.isPassword ? "password" : "text"}"
        ${state.isDisabled ? "disabled" : ""}
        value="${state.value}"
        placeholder="${state.placeholder}"
        autocomplete="new-password"
    />
</div>
`;

export class TextInputComponent extends AbstractView {
  protected state: State = {
    value: "",
    placeholder: "",
    isDisabled: false,
    isPassword: false,
    icon: null,
    translationKey: "",
  };
  constructor(props: Props) {
    super();
    this.setState(props);
  }
  protected setState(props: Props) {
    this.state.value = props.value;
    this.state.placeholder = $t(props.translationKey);
    this.state.isPassword = props.isPassword;
    this.state.isDisabled = props.isDisabled;
    this.state.icon = props.icon;
    this.state.translationKey = props.translationKey;
    this.setEvents();
  }
  protected setEvents() {
    this.emits.setInputEvent = (callback: (data: Concrete) => void) => {
      this.events.input = callback;
    };

    const setLanguage = () => {
      this.state.placeholder = $t(this.state.translationKey);
      this.rerenderElement();
    };
    eventBusUser.off("User:language", setLanguage);
    eventBusUser.on("User:language", setLanguage);
  }
  setHandlers() {
    this.element?.addEventListener("input", (event) => {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      if (this.events.input) {
        this.events.input(target.value);
      }
    });
  }
  get template(): string {
    return createTextInputTemplate(this.state);
  }
}
