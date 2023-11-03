import { AbstractScreen } from "../../framework/interface/AbstractScreen";
import { $t } from "../../utils/helpers";
import { LanguageSwitcherComponent } from "../ui-components/LanguageSwitcher.component";
import { WelcomeTextComponent } from "../ui-components/WelcomeText.component";
import { LinkButtonComponent } from "../ui-components/LinkButton.component";

interface Props {
  language: language;
}

interface State {
  language: Props["language"];
  loginButtonText: string;
  signInButtonText: string;
  welcomeText: string;
}

const createWelcomeScreenTamplate = () => `
    <div class="welcome-screen">
        <div class="welcome-screen__language" data-slot-language></div>
        <div class="welcome-screen__top" data-slot-top></div>
        <div class="welcome-screen__middle" data-slot-message></div>
        <div class="welcome-screen__bottom" data-slot-bottom></div>
    </div>
`;

export class WelcomeScreen extends AbstractScreen {
  get template(): string {
    return createWelcomeScreenTamplate();
  }

  protected components: ScreenComponents = {
    LanguageSwitcherComponent: null,
    EnterButtonComponent: null,
    SignInButtonComponent: null,
    welcomeTextComponent: null,
  };
  protected controllerMethods: Methods;
  protected state: State = {
    language: "en",
    loginButtonText: $t("loginByEmail"),
    signInButtonText: $t("signIn"),
    welcomeText: $t("welcome"),
  };

  constructor(props: Props, methods: Methods) {
    super();
    this.controllerMethods = methods;
    this.setState(props);
    this.initComponents();
    this.renderComponents();
    this.setEvents();
  }

  protected initComponents(): void {
    this.components.LanguageSwitcherComponent = new LanguageSwitcherComponent({
      activeLanguage: this.state.language,
    });
    this.components.WelcomeTextComponent = new WelcomeTextComponent({
      text: $t("welcome"),
    });
    this.components.EnterButtonComponent = new LinkButtonComponent({
      link: "/#/login",
      translationKey: "loginByEmail",
      classes: "brown",
    });
    this.components.SignInButtonComponent = new LinkButtonComponent({
      link: "/#/registration-ways",
      translationKey: "signIn",
      classes: "big green",
    });
  }

  protected renderComponents(): void {
    this.mountComponent("language", this.components.LanguageSwitcherComponent);
    this.mountComponent("top", this.components.EnterButtonComponent);
    this.mountComponent("message", this.components.WelcomeTextComponent);
    this.mountComponent("bottom", this.components.SignInButtonComponent);
  }

  protected setEvents(): void {
    this.components.LanguageSwitcherComponent?.emits.setClickEvent(
      (lang: Concrete) => {
        this.controllerMethods.setLanguage(lang);
      }
    );
  }

  protected setState(props: Props): void {
    this.state = {
      language: props.language,
      loginButtonText: $t("loginByEmail"),
      signInButtonText: $t("signIn"),
      welcomeText: $t("welcome"),
    };
  }
}
