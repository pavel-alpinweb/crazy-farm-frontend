import { AbstractView } from "../../framework/interface/AbstractView";
import { TextInputComponent } from "../ui-components/TextInput.component";
import { ButtonComponent } from "../ui-components/Button.component";

interface Props {
  user: userData;
}

interface State {
  title: string;
  user: Props["user"];
}

const createAuthFormTemplate = (state: State, components: Components) => `
<Form class="auth-form" action="#">
    <h2>${state.title}</h2>
    ${components.LoginTextInput?.template} </br>
    ${components.PasswordTextInput?.template} </br>
    ${components.EmailTextInput?.template} </br>
    ${components.FormButton?.template} </br>
</Form>
`;

export class AuthFormWidget extends AbstractView {
  protected state: State = {
    title: "Введите данные аккаунта",
    user: {
      login: "",
      password: "",
      email: "",
    },
  };
  private components: Components = {
    LoginTextInput: null,
    PasswordTextInput: null,
    EmailTextInput: null,
    FormButton: null,
  };
  constructor(props: Props) {
    super();
    this.state.user = props.user;
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
  }
  get template(): string {
    return createAuthFormTemplate(this.state, this.components);
  }
}
