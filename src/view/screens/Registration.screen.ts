import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { PageHeaderComponent } from "../ui-components/PageHeader.component";
import { AuthFormWidget } from "../widgets/AuthForm.widget";

interface Props {
  user: RegistrationData;
}

interface State {
  title: string;
  user: Props["user"];
}

const createAuthScreenTemplate = () => `
<div class="auth-screen">
    <div class="auth-screen__header" data-slot-header></div>
    <div class="auth-screen__content" data-slot-content></div>
    <div class="auth-screen__footer"><a class="auth-screen__link" href="/#/login">Войти</a></div>
</div>
`;

export class RegistrationScreen extends AbstractScreen {
  protected controllerMethods: Methods = {};
  protected state: State = {
    title: "Регистрация",
    user: {
      loggin: "",
      email: "",
      password: "",
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
    this.setEvents();
    this.renderComponents();
  }
  protected setState(props: Props): void {
    this.state.user = props.user;
  }
  protected initComponents(): void {
    this.components.PageHeaderComponent = new PageHeaderComponent({
      title: this.state.title,
    });
    this.components.AuthFormWidget = new AuthFormWidget({
      user: this.state.user,
    });
  }

  protected renderComponents(): void {
    this.mountComponent("header", this.components.PageHeaderComponent);
    this.mountComponent("content", this.components.AuthFormWidget);
  }

  protected setEvents(): void {
    this.components.AuthFormWidget?.emits.setSubmit((data: Concrete) => {
      this.controllerMethods.sendRegistrationData(data);
    });
  }

  get template(): string {
    return createAuthScreenTemplate();
  }
}
