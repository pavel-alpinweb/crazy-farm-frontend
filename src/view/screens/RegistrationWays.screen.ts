import { AbstractStaticScreen } from "../../framework/interface/AbstractStaticScreen";
import {$t} from "../../utils/helpers";

const getRegistrationWaysTemplate = () => `
<div class="auth-screen">
    <div class="auth-screen__header">
        <div class="page-header">
            <h1>${$t("registration")}</h1>
        </div>
    </div>
    <div class="auth-screen__content">
        <div class="auth-screen__btn-list">
<!--            <button class="button">Войти через Google</button>-->
            <a class="button brown" href="/#/registration">${$t("byEmail")}</a>
            <a class="button green" href="/#/login">${$t("enter")}</a>
        </div>
    </div>
    <div class="auth-screen__footer">
        <a class="button brown left" href="/#/welcome">${$t("back")}</a>
    </div>
</div>
`;

export class RegistrationWaysScreen extends AbstractStaticScreen {
  get template(): string {
    return getRegistrationWaysTemplate();
  }
}
