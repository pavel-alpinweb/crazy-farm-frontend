import {AbstractWidget} from "../../framework/interface/AbstractWidget";
import {ToolComponent} from "../ui-components/Tool.component";

interface Props {
    toolsList: Array<string>;
}

interface State {
    toolsList: Props["toolsList"];
}

const createToolsListTemplate = () => `
<div class="tools-set">
    <div class="tools-set__container" data-slot-tools-list></div>
</div>
`;

export class ToolsSetWidget extends AbstractWidget {
    protected components: WidgetComponents = {};
    protected state: State = {
        toolsList: [],
    };

    constructor(props: Props) {
        super();
        this.setState(props);
        this.initComponents();
        this.setEvents();
        this.renderComponents();
    }

    protected initComponents(): void {
        this.state.toolsList.forEach((toolName) => {
            this.components[`Tool_${toolName}`] = new ToolComponent({
                name: toolName,
            });
        });
    }

    protected renderComponents(): void {
        Object.keys(this.components).forEach((Component) => {
            this.mountComponent('tools-list', this.components[Component]);
        });
    }

    protected setEvents(): void {
        Object.keys(this.components).forEach((Component) => {
            this.components[Component]?.emits.setClickEvent((name: Concrete) => {
                console.log('Tool:', name);
            })
        });
    }

    protected setState(props: Props) {
        this.state.toolsList = props.toolsList
    }

    get template(): string {
        return createToolsListTemplate();
    }
    
}