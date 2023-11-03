import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { PageHeaderComponent } from "../ui-components/PageHeader.component";
import { AuthFormWidget } from "../widgets/AuthForm.widget";
import {LinkButtonComponent} from "../ui-components/LinkButton.component";

interface Props {
  user: LoginData;
}

interface State {
  title: string;
  user: Props["user"];
}

const createAuthScreenTemplate = () => `
<div class="auth-screen">
    <div class="auth-screen__header" data-slot-header></div>
    <div class="auth-screen__content" data-slot-content></div>
    <div class="auth-screen__footer" data-slot-footer></div>
</div>
`;

export class LoginScreen extends AbstractScreen {
  protected controllerMethods: Methods = {};
  protected state: State = {
    title: "Вход",
    user: {
      loggin: "",
      password: "",
    },
  };
  protected components: ScreenComponents = {
    PageHeaderComponent: null,
    UserInfoComponent: null,
    AuthFormWidget: null,
    BackLinkComponent: null,
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
      translationKey: "enter",
    });
    this.components.AuthFormWidget = new AuthFormWidget({
      user: {
        loggin: this.state.user.loggin,
        password: this.state.user.password,
      },
    });
    this.components.BackLinkComponent = new LinkButtonComponent({
      link: '/#/welcome',
      translationKey: 'back',
      classes: 'brown left',
    });
  }

  protected renderComponents(): void {
    this.mountComponent("header", this.components.PageHeaderComponent);
    this.mountComponent("content", this.components.AuthFormWidget);
    this.mountComponent("footer", this.components.BackLinkComponent);
  }

  protected setEvents(): void {
    this.components.AuthFormWidget?.emits.setSubmit((data: Concrete) => {
      this.controllerMethods.login(data);
    });
  }

  get template(): string {
    return createAuthScreenTemplate();
  }
}
