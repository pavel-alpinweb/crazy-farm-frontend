import {AbstractView} from "../../framework/interface/AbstractView";

interface Props {
    cash: number;
}

interface State {
    cash: Props["cash"];
}

export class WalletComponent extends AbstractView{
    protected state: State = {
        cash: 0,
    };

    protected setEvents(): void {
        console.warn("Init: WalletComponent Events");
    }

    protected setState(props: Props): void {
        this.state.cash = props.cash;
    }

    get template(): string {
        return "";
    }
}