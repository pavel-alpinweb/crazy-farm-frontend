import { PageHeaderComponent } from "../ui-components/PageHeader.component";
import { UserInfoComponent } from "../ui-components/UserInfo.component";
import { AuthFormWidget } from "../widgets/AuthForm.widget";
import {AbstractScreen} from "../../framework/interface/AbstractScreen";

interface Props {
  user: userData;
}

interface State {
  title: string;
  user: Props["user"];
}

const createAuthScreenTemplate = (state: State, components: Components) => `
<div class="auth-screen">
    ${components.PageHeaderComponent?.template}
    ${components.UserInfoComponent?.template}
    <hr>
    ${components.AuthFormWidget?.element?.outerHTML}
</div>
`;

export class AuthScreen extends AbstractScreen {
  protected state: State = {
    title: "Вход/Регистрация",
    user: {
      login: "",
      password: "",
      email: "",
    },
  };
  protected components: ScreenComponents = {
    PageHeaderComponent: null,
    UserInfoComponent: null,
    AuthFormWidget: null,
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
    this.components.PageHeaderComponent = new PageHeaderComponent({
      title: this.state.title,
    });
    this.components.UserInfoComponent = new UserInfoComponent({
      user: this.state.user,
    });
    this.components.AuthFormWidget = new AuthFormWidget({
      user: this.state.user,
    });}

  get template(): string {
    return createAuthScreenTemplate(this.state, this.components);
  }
}
