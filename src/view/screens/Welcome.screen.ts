import {AbstractStaticScreen} from "../../framework/interface/AbstractStaticScreen";

const createWelcomeScreenTamplate = () => `
    <div class="welcome-screen">
        <div class="welcome-screen__top">
            <button class="button">Войти через Google</button>
            <a class="button brown" href="/#/login">Войти через почту</a>
        </div>
        <div class="welcome-screen__middle">
            <img src="/assets/img/illustrations/potato.png" alt="potato">
            <img src="/assets/img/illustrations/sprout.png" alt="potato">
        </div>
        <div class="welcome-screen__bottom">
            <a class="button big green" href="/#/registration">Зарегистрироваться</a>
        </div>
    </div>
`;

export class WelcomeScreen extends AbstractStaticScreen{
    get template(): string {
        return createWelcomeScreenTamplate();
    }
}