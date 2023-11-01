import { AbstractStaticScreen } from "../../framework/interface/AbstractStaticScreen";
import {$t} from "../../utils/helpers";

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

export class WelcomeScreen extends AbstractStaticScreen {
  get template(): string {
    return createWelcomeScreenTamplate();
  }
}
