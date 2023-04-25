import { TextInputComponent } from "../ui-components/TextInput.component";
import { ButtonComponent } from "../ui-components/Button.component";
import {AbstractWidget} from "../../framework/interface/AbstractWidget";

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
    ${components.FormButton?.element?.outerHTML} </br>
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
  }
  setHandlers() {
    console.log('Implement setHandlers: renderedElement', this.element);
    this.renderedElement?.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log('Click!');
    });
  }

  get template(): string {
    return createAuthFormTemplate(this.state, this.components);
  }
}
