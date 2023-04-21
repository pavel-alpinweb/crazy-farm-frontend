import {AbstractView} from "../../framework/interface/AbstractView";

const createAuthScreenTemplate = () => `
<h1>Вход/Регистрация</h1>
`;

export class AuthScreen extends AbstractView {
    constructor() {
        super();
    }
    get template(): string {
        return createAuthScreenTemplate();
    }
}