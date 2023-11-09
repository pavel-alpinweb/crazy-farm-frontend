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
        currentActions: [],
    };

    public get state(): AlmanacState {
        return this.almanacState;
    }

    public toggleAlmanac(): void {
        this.almanacState.currentActions = ['show', 'close'];
        this.almanacState.isShow = !this.almanacState.isShow;
        eventBusAlmanac.emit("Almanac:toggleView", this.state);
    }
}