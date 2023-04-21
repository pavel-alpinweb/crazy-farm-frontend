import {AbstractView} from "../../framework/interface/AbstractView";


interface Props {
    login: string;
    password: string;
    email: string,
}

interface State {
    title: string;
    user: Props;
}

const createAuthScreenTemplate = (state: State) => `
<div class="auth-screen">
    <h1>${state.title}</h1>
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
    constructor(props: Props) {
        super();
        this.state.user = props;
    }
    get template(): string {
        return createAuthScreenTemplate(this.state);
    }
}