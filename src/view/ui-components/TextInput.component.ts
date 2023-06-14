import { AbstractView } from "../../framework/interface/AbstractView";

interface Props {
  value: string;
  placeholder: string;
  isDisabled?: boolean;
  isError?: boolean;
  errorText?: string;
  icon?: string;
  isPassword: boolean;
}

interface State {
  value: Props["value"];
  placeholder: Props["placeholder"];
  isPassword: Props["isPassword"];
  isDisabled: boolean | Props["isDisabled"];
  isError: boolean | Props["isError"];
  icon: null | Props["icon"];
  errorText: null | Props["errorText"];
  isOpenHint: boolean;
}

const createTextInputTemplate = (state: State) => `
<div class="text-input-container">
    <input
        class=
            "text-input 
            ${state.isError ? "text-input--error" : ""}
            ${
              state.icon
                ? `text-input--icon text-input--icon-${state.icon}`
                : ""
            }
            "
        type="${state.isPassword ? "password" : "text"}"
        ${state.isDisabled ? "disabled" : ""}
        value="${state.value}"
        placeholder="${state.placeholder}"
    />
    ${
      state.isError
        ? `
      <div class="text-input-hint-trigger" data-hint-trigger>
        <img class="text-input-hint-icon" src="/assets/img/icons/warning.svg" alt="warning">
      </div>
    `
        : ""
    }
    ${
      state.isError && state.errorText && state.isOpenHint
        ? `
      <div class="text-input-error-message">
        ${state.errorText}
      </div>
    `
        : ""
    }
</div>
`;

export class TextInputComponent extends AbstractView {
  protected state: State = {
    value: "",
    placeholder: "",
    isDisabled: false,
    isError: false,
    isPassword: false,
    icon: null,
    errorText: null,
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
    this.state.errorText = props.errorText;
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
    this.element
      ?.querySelector("[data-hint-trigger]")
      ?.addEventListener("click", () => {
        this.state.isOpenHint = !this.state.isOpenHint;
        this.rerenderElement();
      });
  }
  get template(): string {
    return createTextInputTemplate(this.state);
  }
}
