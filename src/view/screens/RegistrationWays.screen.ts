import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { $t } from "../../utils/helpers";
import { GoogleButtonComponent } from "../ui-components/GoogleButton.component";

interface State {
  registrationByEmailText: string;
  signInText: string;
  backButtonText: string;
}

const getRegistrationWaysTemplate = () => `
<div class="auth-screen">
    <div class="auth-screen__header">
        <div class="page-header">
            <h1>${$t("registration")}</h1>
        </div>
    </div>
    <div class="auth-screen__content">
        <div class="auth-screen__btn-list">
            <div data-slot-google class="autth-screen__google-container"></div>
            <a class="button brown" href="/#/registration">${$t("byEmail")}</a>
            <a class="button green" href="/#/login">${$t("enter")}</a>
        </div>
    </div>
    <div class="auth-screen__footer">
        <a class="button brown left" href="/#/welcome">${$t("back")}</a>
    </div>
</div>
`;

export class RegistrationWaysScreen extends AbstractScreen {
  get template(): string {
    return getRegistrationWaysTemplate();
  }

  protected components: ScreenComponents = {
    GoogleButtonComponent: null,
  };
  protected controllerMethods: Methods;
  protected state: State = {
    registrationByEmailText: "",
    signInText: "",
    backButtonText: "",
  };

  constructor(methods: Methods) {
    super();
    this.controllerMethods = methods;
    this.setState();
    this.initComponents();
    this.renderComponents();
    this.setEvents();
  }

  protected initComponents(): void {
    this.components.GoogleButtonComponent = new GoogleButtonComponent({
      size: "large",
      theme: "outline",
    });
  }

  protected renderComponents(): void {
    this.mountComponent("google", this.components.GoogleButtonComponent);
  }

  protected setEvents(): void {
    this.components.GoogleButtonComponent?.emits.setCredentialResponseEvent(
      async (response: any) => {
        this.controllerMethods.sendGoogleCredential(response.credential);
      }
    );
  }

  protected setState(): void {
    this.state.registrationByEmailText = $t("byEmail");
    this.state.signInText = $t("enter");
    this.state.backButtonText = $t("back");
  }
}
