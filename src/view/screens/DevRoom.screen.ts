import {AbstractScreen} from "../../framework/interface/AbstractScreen";
import {DEFAULT_FARM_STATE} from "../../utils/constants";
import {DevScene} from "../scenes/Dev.scene";

interface State {
    farm: FarmState;
}

const createDevRoomScreenTemplate = () => `
<div class="dev-room">
    <div class="dev-room__scene" data-slot-scene></div>
    <div class="dev-room__tool" data-slot-tool></div>
    <div class="dev-room__tool-set" data-slot-tool-set></div>
</div>
`;

export class DevRoomScreen extends AbstractScreen{
    protected controllerMethods: Methods = {};
    protected components: ScreenComponents = {
        MainScene: null,
    };
    protected state: State = {
        farm: DEFAULT_FARM_STATE,
    };

    constructor() {
        super();
        this.initComponents();
        this.renderComponents();
    }

    protected initComponents(): void {
        this.components.MainScene = new DevScene({ farm: this.state.farm });
    }

    protected renderComponents(): void {
        this.mountComponent('scene', this.components.MainScene);
    }

    protected setEvents(): void {
        console.warn('Init: DevRoom Events');
    }

    protected setState(): void {
        console.warn('Init: DevRoom state');
    }

    get template(): string {
        return createDevRoomScreenTemplate();
    }

    public remove(): void {
        this.components.MainScene?.remove();
        super.remove();
    }
}