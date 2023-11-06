import {AbstractView} from "../../framework/interface/AbstractView";
import {GOOGLE_CLIENT_ID} from "../../utils/constants";

interface Props {
    size: string;
    theme: string;
}

interface State {
    size: Props["size"];
    theme: Props["size"];
    clientId: string;
}

const createGoogleButtonTemplate = () => `
    <div id="buttonDiv">Google</div>
`;

export class GoogleButtonComponent extends AbstractView{
    protected state: State = {
        size: "large",
        theme: "outline",
        clientId: GOOGLE_CLIENT_ID,
    };

    constructor(props: Props) {
        super();
        this.setState(props);
        this.setEvents();
    }

    protected setEvents(): void {
        console.warn('setEvents');
    }
    setHandlers() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        google?.accounts.id.initialize({
            client_id: this.state.clientId,
            callback: () => { console.log("Init Google!") },
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        google.accounts.id.renderButton(
            this.element,
            { theme: this.state.theme, size: this.state.size }
        );
    }

    protected setState(props: Props): void {
        this.state.size = props.size;
        this.state.theme = props.theme;
    }

    get template(): string {
        return createGoogleButtonTemplate();
    }
}