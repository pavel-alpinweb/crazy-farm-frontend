import {AbstractView} from "../../framework/interface/AbstractView";
import {PageHeaderComponent} from "../ui-components/PageHeader.component";


interface Props {
    login: string;
    password: string;
    email: string,
}

interface State {
    title: string;
    user: Props;
}

const createAuthScreenTemplate = (state: State, components: Components) => `
<div class="auth-screen">
    ${components.PageHeaderComponent?.template}
    <h2>Пользователь:</h2>
    <h4>${state.user.login}</h4>
    <h2>Пароль:</h2>
    <h4>${state.user.password}</h4>
    <h2>Email:</h2>
    <h4>${state.user.email}</h4>
</div>
`;

export class AuthScreen extends AbstractView {
    protected state: State = {
        title: 'Вход/Регистрация',
        user: {
            login: '',
            password: '',
            email: '',
        },
    };
    private components: Components = {
        PageHeaderComponent: null
    };
    constructor(props: Props) {
        super();
        this.state.user = props;
        this.components.PageHeaderComponent = new PageHeaderComponent({
            title: this.state.title,
        });
    }
    get template(): string {
        return createAuthScreenTemplate(this.state, this.components);
    }
}