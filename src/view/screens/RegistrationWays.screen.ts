import { AbstractStaticScreen } from "../../framework/interface/AbstractStaticScreen";

const getRegistrationWaysTemplate = () => `
<div class="auth-screen">
    <div class="auth-screen__header">
        <div class="page-header">
            <h1>Регстрация</h1>
        </div>
    </div>
    <div class="auth-screen__content">
        <div class="auth-screen__btn-list">
<!--            <button class="button">Войти через Google</button>-->
            <a class="button brown" href="/#/registration">Через почту</a>
            <a class="button green" href="/#/login">Войти</a>
        </div>
    </div>
</div>
`;

export class RegistrationWaysScreen extends AbstractStaticScreen {
  get template(): string {
    return getRegistrationWaysTemplate();
  }
}
