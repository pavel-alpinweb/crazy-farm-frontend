import { TextInputComponent } from "../ui-components/TextInput.component";
import { ButtonComponent } from "../ui-components/Button.component";
import {AbstractWidget} from "../../framework/interface/AbstractWidget";
import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
  user: userData;
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
    this.renderComponents();

    this.emits.setSubmit = (callback: (data: string) => void) => {
      this.events.submit = callback;
    }
  }
  protected setState(props: Props) {
    this.state.user = props.user;
  }
  protected initComponents() {
    this.components.LoginTextInput = new TextInputComponent({
      value: this.state.user.login,
      placeholder: "Введите логин",
      isDisabled: false,
      isError: false,
      isPassword: false,
    });
    this.components.PasswordTextInput = new TextInputComponent({
      value: this.state.user.password,
      placeholder: "Введите пароль",
      isDisabled: false,
      isError: false,
      isPassword: true,
    });
    this.components.EmailTextInput = new TextInputComponent({
      value: this.state.user.email,
      placeholder: "Введите email",
      isDisabled: false,
      isError: false,
      isPassword: false,
    });
    this.components.FormButton = new ButtonComponent({
      title: "Отправить",
    });

    this.components.FormButton.emits.setClickEvent((data: string) => {
      this.events.submit(data);
    });
  }

  get template(): string {
    return createAuthFormTemplate(this.state);
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
}
