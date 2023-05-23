import { AbstractView } from "../../framework/interface/AbstractView";

interface Props {
  value: string;
  placeholder: string;
  isDisabled: boolean;
  isError: boolean;
  isPassword: boolean;
  icon?: string;
}

interface State {
  value: Props["value"];
  placeholder: Props["placeholder"];
  isPassword: Props["isPassword"];
  isDisabled: boolean;
  isError: boolean;
  icon: null | Props["icon"];
  isOpenHint: boolean;
}

const createTextInputTemplate = (state: State) => `
<input
    class=
        "text-input 
        ${state.isError ? "text-input--error" : ""}
        ${state.icon ? `text-input--icon text-input--icon-${state.icon}` : ""}
        "
    type="${state.isPassword ? "password" : "text"}"
    ${state.isDisabled ? "disabled" : ""}
    value="${state.value}"
    placeholder="${state.placeholder}"
/>
`;

export class TextInputComponent extends AbstractView {
  protected state: State = {
    value: "",
    placeholder: "",
    isDisabled: false,
    isError: false,
    isPassword: false,
    icon: null,
    isOpenHint: false,
  };
  constructor(props: Props) {
    super();
    this.setState(props);
  }
  protected setState(props: Props) {
    this.state.value = props.value;
    this.state.placeholder = props.placeholder;
    this.state.isPassword = props.isPassword;
    this.state.isDisabled = props.isDisabled;
    this.state.isError = props.isError;
    this.state.icon = props.icon;
    this.setEvents();
  }
  protected setEvents() {
    this.emits.setInputEvent = (callback: (data: Concrete) => void) => {
      this.events.input = callback;
    };
  }
  setHandlers() {
    this.element?.addEventListener("input", (event) => {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      this.events.input(target.value);
    });
  }
  get template(): string {
    return createTextInputTemplate(this.state);
  }
}
