import {EventBus} from "../framework/EventBus";

declare global {
    type AlmanacAction = 'show' | 'close';

    interface AlmanacState {
        isActive: boolean;
        isShow: boolean;
        currentTextKey: string;
        currentActions: AlmanacAction[];
    }
}

export const eventBusAlmanac: EventBus = new EventBus();

export class AlmanacModel {
    private almanacState: AlmanacState = {
        isActive: false,
        isShow: false,
        currentTextKey: 'tools.shovel',
        currentActions: ['show', 'close'],
    };

    public get state(): AlmanacState {
        return this.almanacState;
    }

    public toggleAlmanac(): void {
        this.almanacState.currentActions = ['show', 'close'];
        this.almanacState.isShow = !this.almanacState.isShow;
        eventBusAlmanac.emit("Almanac:toggleView", this.state);
    }

    public activateAlmanac(): void {
        this.almanacState.currentActions = ['show', 'close'];
        this.almanacState.isShow = false;
        this.almanacState.isActive = true;
        eventBusAlmanac.emit("Almanac:activate", this.state.isActive);
        eventBusAlmanac.emit("Almanac:toggleView", this.state);
    }

    public deactivateAlmanac(): void {
        this.almanacState.currentActions = [];
        this.almanacState.isShow = false;
        this.almanacState.isActive = false;
        eventBusAlmanac.emit("Almanac:activate", this.state.isActive);
        eventBusAlmanac.emit("Almanac:toggleView", this.state);
    }

    public setAlmanacDataForTools(tool: tool): void {
        this.almanacState.currentActions = ['show', 'close'];
        this.almanacState.isShow = true;
        this.almanacState.isActive = false;
        this.almanacState.currentTextKey = `tools.${tool}`;
        eventBusAlmanac.emit("Almanac:activate", this.state.isActive);
        eventBusAlmanac.emit("Almanac:toggleView", this.state);
    }

    public setAlmanacDataForCharacter(cell: Cell): void {
        this.almanacState.currentActions = ['show', 'close'];
        this.almanacState.isShow = true;
        this.almanacState.isActive = false;
        if (cell.character) {
            this.almanacState.currentTextKey =
                `character.${cell.character.type}.${cell.character.stage}`;
        } else {
            this.almanacState.currentTextKey = 'character.empty'
        }
        eventBusAlmanac.emit("Almanac:activate", this.state.isActive);
        eventBusAlmanac.emit("Almanac:toggleView", this.state);
    }
}