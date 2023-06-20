import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
    name: string;
}

interface State {
    name: Props["name"];
}

const createToolTemplate = (state: State) => `
<div class="tool tool--${state.name}">Tool</div>
`;

export class ToolComponent extends AbstractView{
    protected state: State = {
        name: '',
    };
    constructor(props: Props) {
        super();
        this.setState(props);
        this.setEvents();
    }

    protected setEvents(): void {
        this.emits.setClickEvent = (callback: (data: Concrete) => void) => {
            this.events.click = callback;
        };
    }

    protected setState(props: Props): void {
        this.state.name = props.name;
    }

    get template(): string {
        return createToolTemplate(this.state);
    }
    
}