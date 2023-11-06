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

    protected setEvents(): void {
        console.warn('setEvents');
    }

    protected setState(props: Props): void {
        this.state.size = props.size;
        this.state.theme = props.theme;
    }

    get template(): string {
        return createGoogleButtonTemplate();
    }
}