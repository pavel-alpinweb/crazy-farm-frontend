import { PageHeaderComponent } from "../ui-components/PageHeader.component";
import { UserInfoComponent } from "../ui-components/UserInfo.component";
import { AuthFormWidget } from "../widgets/AuthForm.widget";
import {AbstractScreen} from "../../framework/interface/AbstractScreen";
import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
  user: UserData;
}

interface State {
  title: string;
  user: Props["user"];
}

const createAuthScreenTemplate = () => `
<div class="auth-screen"></div>
`;

export class AuthScreen extends AbstractScreen {
  private controllerMethods: Methods = {};
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
  constructor(props: Props, methods: Methods) {
    super();
    this.controllerMethods = methods;
    this.setState(props);
    this.initComponents();
    this.renderComponents();
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
    });

    this.components.PageHeaderComponent.emits.setClickEvent((data: Concrete) => {
      console.log('Header click!', data);
    });

    this.components.AuthFormWidget.emits.setSubmit((data: Concrete) => {
      this.controllerMethods.updateUser();
    });
  }

  protected renderComponents() {
    this.element?.insertAdjacentElement(
        AbstractView.positions.AFTERBEGIN,
        <Element>this.components.PageHeaderComponent?.element
    );
    this.element?.insertAdjacentElement(
        AbstractView.positions.BEFOREEND,
        <Element>this.components.UserInfoComponent?.element
    );
    this.element?.insertAdjacentElement(
        AbstractView.positions.BEFOREEND,
        <Element>this.components.AuthFormWidget?.element
    );
  }

  get template(): string {
    return createAuthScreenTemplate();
  }
}
