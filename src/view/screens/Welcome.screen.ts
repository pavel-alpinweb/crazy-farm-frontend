import {AbstractScreen} from "../../framework/interface/AbstractScreen";
import {$t} from "../../utils/helpers";
import {LanguageSwitcherComponent} from "../ui-components/LanguageSwitcher.component";
import {WelcomeTextComponent} from "../ui-components/WelcomeText.component";

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
        <div class="welcome-screen__top">
<!--            <button class="button">Войти через Google</button>-->
            <a class="button brown" href="/#/login">Войти через почту</a>
        </div>
        <div class="welcome-screen__middle" data-slot-message></div>
        <div class="welcome-screen__bottom">
            <a class="button big green" href="/#/registration-ways">Зарегистрироваться</a>
        </div>
    </div>
`;

export class WelcomeScreen extends AbstractScreen {
  get template(): string {
    return createWelcomeScreenTamplate();
  }

  protected components: ScreenComponents = {
    LanguageSwitcherComponent: null,
    EnterButtonComponent: null,
    RegistrationButtonComponent: null,
    SignInButtonComponent: null,
    welcomeTextComponent: null,
  };
  protected controllerMethods: Methods;
  protected state: State = {
    language: 'en',
    loginButtonText: 'Войти через почту',
    signInButtonText: 'Зарегистрироваться',
    welcomeText: 'Фермер, стой! Выбери портал, через который ты войдешь!',
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
    this.components.welcomeTextComponent = new WelcomeTextComponent({
      text: this.state.welcomeText,
    });
  }

  protected renderComponents(): void {
    this.mountComponent("language", this.components.LanguageSwitcherComponent);
    this.mountComponent("message", this.components.welcomeTextComponent);
  }

  protected setEvents(): void {
    this.components.LanguageSwitcherComponent?.emits.setClickEvent((lang: Concrete) => {
      this.controllerMethods.setLanguage(lang);
    });
  }

  protected setState(props: Props): void {
    this.state = {
      language: props.language,
      loginButtonText: 'Войти через почту',
      signInButtonText: 'Зарегистрироваться',
      welcomeText: $t("welcome"),
    };
  }
}
