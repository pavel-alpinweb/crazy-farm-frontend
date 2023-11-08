import {AbstractView} from "../../framework/interface/AbstractView";
import {$t} from "../../utils/helpers";

interface Props {
    isActive: AlmanacState["isActive"];
    currentTextKey: AlmanacState["currentTextKey"];
    currentActions: AlmanacState["currentActions"];
}

interface State {
    isActive: Props["isActive"];
    currentTextKey: Props["currentTextKey"];
    currentActions: Props["currentActions"];
}

const createAlmanacTemplate = (state: State) => `
    <div class="almanac ${state.isActive ? 'active' : ''}">
        <div class="almanac__text">${ $t(state.currentTextKey) }</div>
        <div class="almanac__buttons">
            ${ state.currentActions.map((button) => `
                <button class="button green" data-action-${button}>${button}</button> 
            `).join('')}
        </div>
    </div>
`;

export class AlmanacComponent extends AbstractView {
    protected state: State = {
        isActive: false,
        currentTextKey: 'tools.shovel',
        currentActions: ['show', 'close'],
    };
    constructor(props: Props) {
        super();
        this.setState(props);
        this.setEvents();
    }

    protected setEvents(): void {
        console.warn('setEvents: AlmanacComponent');
    }

    protected setState(props: Props): void {
        this.state = props;
    }

    get template(): string {
        return createAlmanacTemplate(this.state);
    }
}