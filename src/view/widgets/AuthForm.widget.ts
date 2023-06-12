import { TextInputComponent } from "../ui-components/TextInput.component";
import { ButtonComponent } from "../ui-components/Button.component";
import { AbstractWidget } from "../../framework/interface/AbstractWidget";
import { eventBus } from "../../main";

interface Props {
  user: UserData;
}

interface State {
  user: Props["user"];
}

const createAuthFormTemplate = () => `
<Form class="auth-form" action="#">
    <div class="auth-form__fields">
        <div class="auth-form__input-container" data-slot-login-input></div>
        <div class="auth-form__input-container" data-slot-email-input></div>
        <div class="auth-form__input-container" data-slot-password-input></div>
    </div>
    <div class="auth-form__button-container" data-slot-button></div>
</Form>
`;

export class AuthFormWidget extends AbstractWidget {
  protected state: State = {
    user: {
      userId: "",
      loggin: "",
      password: "",
      email: "",
    },
  };
  protected components: WidgetComponents = {
    LoginTextInput: null,
    PasswordTextInput: null,
    EmailTextInput: null,
    FormButton: null,
  };
  constructor(props: Props) {
    super();
    this.setState(props);
    this.initComponents();
    this.setEvents();
    this.renderComponents();
  }
  protected setState(props: Props) {
    this.state.user = props.user;
  }
  protected initComponents() {
    this.components.LoginTextInput = new TextInputComponent({
      value: this.state.user.loggin,
      placeholder: "Введите логин",
      isPassword: false,
      icon: "user",
    });
    this.components.EmailTextInput = new TextInputComponent({
      value: this.state.user.email,
      placeholder: "Введите email",
      isDisabled: false,
      isError: false,
      errorText:
        "Текст с описанием ошибки. Это может быть многострочный прокручиваемый текст.",
      isPassword: false,
      icon: "envelope",
    });
    if (this.state.user.password) {
      this.components.PasswordTextInput = new TextInputComponent({
        value: this.state.user.password,
        placeholder: "Введите пароль",
        isPassword: true,
        icon: "lock",
      });
    }
    this.components.FormButton = new ButtonComponent({
      title: "Отправить",
    });
  }
  protected setEvents(): void {
    this.emits.setSubmit = (callback: (data: Concrete) => void) => {
      this.events.submit = callback;
    };
    this.components.LoginTextInput?.emits.setInputEvent((data: Concrete) => {
      if (typeof data === "string") {
        this.state.user.loggin = data;
      }
    });
    this.components.PasswordTextInput?.emits.setInputEvent((data: Concrete) => {
      if (typeof data === "string") {
        this.state.user.password = data;
      }
    });
    this.components.EmailTextInput?.emits.setInputEvent((data: Concrete) => {
      if (typeof data === "string") {
        this.state.user.email = data;
      }
    });
    this.components.FormButton?.emits.setClickEvent(() => {
      this.events.submit({
        loggin: this.state.user.loggin,
        email: this.state.user.email,
        password: this.state.user.password,
      });
    });
    const updateElement = (data: UserData) => {
      this.state.user = data;
      this.updateWidget();
    };
    eventBus.off("User:update", updateElement);
    eventBus.on("User:update", updateElement);
  }
  protected renderComponents(): void {
    this.mountComponent("login-input", this.components.LoginTextInput);
    if (this.components.PasswordTextInput) {
      this.mountComponent("password-input", this.components.PasswordTextInput);
    }
    this.mountComponent("email-input", this.components.EmailTextInput);
    this.mountComponent("button", this.components.FormButton);
  }
  get template(): string {
    return createAuthFormTemplate();
  }
}
