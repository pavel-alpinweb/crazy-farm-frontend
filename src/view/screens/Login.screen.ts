import {AbstractScreen} from "../../framework/interface/AbstractScreen";

interface Props {
    user: UserData;
}

interface State {
    title: string;
    user: Props["user"];
}

const createAuthScreenTemplate = () => `
<div class="auth-screen">
    <div class="auth-screen__header" data-slot-header>Вход</div>
    <div class="auth-screen__content" data-slot-content>Отправить</div>
    <div class="auth-screen__footer">Зарегестрироваться</div>
</div>
`;

export class LoginScreen extends AbstractScreen{

    protected controllerMethods: Methods = {};
    protected state: State = {
        title: "Вход",
        user: {
            login: "",
            password: "",
            email: "",
        },
    };
    protected components: ScreenComponents = {
        PageHeaderComponent: null,
        UserInfoComponent: null,
        AuthFormWidget: null,
    };
    constructor(props: Props, methods: Methods) {
        super();
        this.controllerMethods = methods;
        this.setState(props);
        this.initComponents();
        this.setEvents();
        this.renderComponents();
    }
    protected setState(props: Props): void {
        this.state.user = props.user;
    }
    protected initComponents(): void {
        console.warn("Init components", this.constructor.name);
    }

    protected renderComponents(): void {
        console.warn("Init rendering components", this.constructor.name);
    }

    protected setEvents(): void {
        console.warn("Init events", this.constructor.name);
    }



    get template(): string {
        return createAuthScreenTemplate();
    }
}