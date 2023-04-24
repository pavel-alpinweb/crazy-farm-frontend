import {AbstractView} from "../../framework/interface/AbstractView";
import {PageHeaderComponent} from "../ui-components/PageHeader.component";
import {UserInfoComponent} from "../ui-components/UserInfo.component";
import {AuthFormWidget} from "../widgets/AuthForm.widget";


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
    ${components.UserInfoComponent?.template}
    <hr>
    ${components.AuthFormWidget?.template}
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
        PageHeaderComponent: null,
        UserInfoComponent: null,
        AuthFormWidget: null,
    };
    constructor(props: Props) {
        super();
        this.state.user = props;
        this.components.PageHeaderComponent = new PageHeaderComponent({
            title: this.state.title,
        });
        this.components.UserInfoComponent = new UserInfoComponent({
            user: this.state.user,
        });
        this.components.AuthFormWidget = new AuthFormWidget({
            user: this.state.user,
        });
    }
    get template(): string {
        return createAuthScreenTemplate(this.state, this.components);
    }
}