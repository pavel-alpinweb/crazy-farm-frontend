import { AbstractView } from "../../framework/interface/AbstractView";

interface Props {
  user: userData;
}

interface State {
  user: Props["user"];
}

const createUserInfoTemplate = (state: State) => `
<div class="user-info">
    <h3>Пользователь:</h3>
    <h4>${state.user.login}</h4>
    <h3>Пароль:</h3>
    <h4>${state.user.password}</h4>
    <h3>Email:</h3>
    <h4>${state.user.email}</h4>
</div>
`;

export class UserInfoComponent extends AbstractView {
    protected state: State = {
        user: {
            login: '',
            password: '',
            email: '',
        },
    };
    constructor(props: Props) {
        super();
        this.state.user = props.user;
    }
    get template(): string {
        return createUserInfoTemplate(this.state);
    }
}
