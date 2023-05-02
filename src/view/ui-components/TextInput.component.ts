import { AbstractView } from "../../framework/interface/AbstractView";

interface Props {
  value: string;
  placeholder: string;
  isDisabled: boolean;
  isError: boolean;
  isPassword: boolean;
}

interface State {
  value: Props["value"];
  placeholder: Props["placeholder"];
  isPassword: Props["isPassword"];
  isDisabled: boolean;
  isError: boolean;
}

const createTextInputTemplate = (state: State) => `
<input
    class="text-input ${state.isError ? "text-input--error" : ""}"
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
  };
  constructor(props: Props) {
    super();
    this.setState(props);
  }
  protected setState(props: Props) {
    this.state = props;
    this.setEvents();
  }
  protected setEvents() {
    this.emits.setInputEvent = (callback: (data: Concrete) => void) => {
      this.events.input = callback;
    }
  }
  setHandlers() {
    this.element?.addEventListener('input', (event) => {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      this.events.input(target.value);
    });
  }
  get template(): string {
    return createTextInputTemplate(this.state);
  }
}
