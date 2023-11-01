import {AbstractView} from "../../framework/interface/AbstractView";
import {$t} from "../../utils/helpers";

interface Props {
    text: string;
}

interface State {
    text: Props["text"];
}

const createWelcomeTextTemplate = (state: State) => `
    <div class="welcome-text">
        <div class="welcome-text__character">
            <img src="/assets/img/illustrations/potato.png" alt="potato">
            <div class="welcome-text__text">
                ${ state.text }
            </div>
        </div>
        <img src="/assets/img/illustrations/sprout.png" alt="potato">
    </div>
`;

export class WelcomeTextComponent extends AbstractView{
    protected state: State = {
        text: $t("welcome"),
    };

    constructor(props: Props) {
        super();
        this.setState(props);
        this.setEvents();
    }

    protected setEvents(): void {
        console.warn('setEvents');
    }

    protected setState(props: Props): void {
        this.state.text = props.text;
    }

    get template(): string {
        return createWelcomeTextTemplate(this.state);
    }

}