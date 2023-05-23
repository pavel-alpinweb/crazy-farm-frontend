import { TextInputComponent } from "../ui-components/TextInput.component";
import { ButtonComponent } from "../ui-components/Button.component";
import { AbstractWidget } from "../../framework/interface/AbstractWidget";
import { AbstractView } from "../../framework/interface/AbstractView";
import { eventBus } from "../../main";

interface Props {
  user: UserData;
}

interface State {
  title: string;
  user: Props["user"];
}

const createAuthFormTemplate = (state: State) => `
<Form class="auth-form" action="#" style="display: flex; flex-direction: column; align-items: flex-start;">
    <h2>${state.title}</h2>
</Form>
`;

export class AuthFormWidget extends AbstractWidget {
  protected state: State = {
    title: "Введите данные аккаунта",
    user: {
      login: "",
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
      value: this.state.user.login,
      placeholder: "Введите логин",
      isDisabled: false,
      isPassword: false,
      icon: 'user',
    });
    this.components.PasswordTextInput = new TextInputComponent({
      value: this.state.user.password,
      placeholder: "Введите пароль",
      isDisabled: false,
      isPassword: true,
      icon: 'lock',
    });
    this.components.EmailTextInput = new TextInputComponent({
      value: this.state.user.email,
      placeholder: "Введите email",
      isDisabled: false,
      isError: true,
      errorText: 'Текст с описанием ошибки. Это может быть многострочный прокручиваемый текст.',
      isPassword: false,
      icon: 'envelope',
    });
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
        this.state.user.login = data;
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
      this.events.submit(this.state.user);
    });
    const updateElement = (data: UserData) => {
      this.state.user = data;
      this.updateWidget();
    };
    eventBus.off("User:update", updateElement);
    eventBus.on("User:update", updateElement);
  }
  protected renderComponents(): void {
    this.element?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.components.LoginTextInput?.element
    );
    this.element?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.components.PasswordTextInput?.element
    );
    this.element?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.components.EmailTextInput?.element
    );
    this.element?.insertAdjacentElement(
      AbstractView.positions.BEFOREEND,
      <Element>this.components.FormButton?.element
    );
  }
  get template(): string {
    return createAuthFormTemplate(this.state);
  }
}
