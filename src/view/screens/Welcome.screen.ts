import {AbstractScreen} from "../../framework/interface/AbstractScreen";
import {$t} from "../../utils/helpers";

interface State {
  language: language;
  loginButtonText: string;
  signInButtonText: string;
  welcomeText: string;
}

const createWelcomeScreenTamplate = () => `
    <div class="welcome-screen">
        <div class="welcome-screen__top">
<!--            <button class="button">Войти через Google</button>-->
            <a class="button brown" href="/#/login">Войти через почту</a>
        </div>
        <div class="welcome-screen__middle">
            <div class="welcome-screen__character">
                <img src="/assets/img/illustrations/potato.png" alt="potato">
                <div class="welcome-screen__text">
                    ${ $t("welcome") }
                </div>
            </div>
            <img src="/assets/img/illustrations/sprout.png" alt="potato">
        </div>
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
    EnterButtonComponent: null,
    RegistrationButtonComponent: null,
    SignInButtonComponent: null,
  };
  protected controllerMethods: Methods;
  protected state: State = {
    language: 'en',
    loginButtonText: 'Войти через почту',
    signInButtonText: 'Зарегистрироваться',
    welcomeText: 'Фермер, стой! Выбери портал, через который ты войдешь!',
  };

  constructor(methods: Methods) {
    super();
    this.controllerMethods = methods;
  }

  protected initComponents(): void {
    console.warn('initComponents');
  }

  protected renderComponents(): void {
    console.warn('renderComponents');
  }

  protected setEvents(): void {
    console.warn('setEvents');
  }

  protected setState(): void {
    this.state = {
      language: 'en',
      loginButtonText: 'Войти через почту',
      signInButtonText: 'Зарегистрироваться',
      welcomeText: $t("welcome"),
    };
  }
}
