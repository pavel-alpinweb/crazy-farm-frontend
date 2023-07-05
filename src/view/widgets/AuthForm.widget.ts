import { TextInputComponent } from "../ui-components/TextInput.component";
import { ButtonComponent } from "../ui-components/Button.component";
import { AbstractWidget } from "../../framework/interface/AbstractWidget";

interface Props {
  user: RegistrationData | LoginData;
}

interface State {
  user: Props["user"];
}

const createAuthFormTemplate = (state: State) => `
<Form class="auth-form" action="#" autocomplete="off">
    <div class="auth-form__fields">
        <div class="auth-form__input-container" data-slot-login-input></div>
        ${'email' in state.user ? '<div class="auth-form__input-container" data-slot-email-input></div>' : ''}
        ${'password' in state.user ? '<div class="auth-form__input-container" data-slot-password-input></div>' : ''}
              
    </div>
    <div class="auth-form__button-container" data-slot-button></div>
</Form>
`;

export class AuthFormWidget extends AbstractWidget {
  protected state: State = {
    user: {
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
    if ('email' in this.state.user) {
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
    }
    if ('password' in this.state.user) {
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
      if (typeof data === "string" && 'email' in this.state.user) {
        this.state.user.email = data;
      }
    });
    this.components.FormButton?.emits.setClickEvent(() => {
      if ('email' in this.state.user && 'password' in this.state.user) {
        this.events.submit({
          loggin: this.state.user.loggin,
          email: this.state.user.email,
          password: this.state.user.password,
        });
      } else if ('password' in this.state.user) {
        this.events.submit({
          loggin: this.state.user.loggin,
          password: this.state.user.password,
        });
      }
    });
  }
  protected renderComponents(): void {
    this.mountComponent("login-input", this.components.LoginTextInput);
    if (this.components.EmailTextInput) {
      this.mountComponent("email-input", this.components.EmailTextInput);
    }
    this.mountComponent("password-input", this.components.PasswordTextInput);
    this.mountComponent("button", this.components.FormButton);
  }
  get template(): string {
    return createAuthFormTemplate(this.state);
  }
}
