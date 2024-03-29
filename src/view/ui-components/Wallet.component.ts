import { AbstractView } from "../../framework/interface/AbstractView";
import { eventBusFarm } from "../../model/farm.model";

interface Props {
  cash: number;
}

interface State {
  cash: Props["cash"];
}

const createWalletComponentTemplate = (state: State): string => `
    <div class="wallet">
        <div class="wallet__icon"></div>
        <div class="wallet__value">${state.cash}</div>
    </div>
`;

export class WalletComponent extends AbstractView {
  protected state: State = {
    cash: 0,
  };

  constructor(props: Props) {
    super();
    this.setState(props);
    this.setEvents();
  }

  protected setEvents(): void {
    const updateElement = (cash: number) => {
      this.state.cash = cash;
      this.rerenderElement();
    };

    eventBusFarm.on("Farm:update_wallet", updateElement);
  }

  protected setState(props: Props): void {
    this.state.cash = props.cash;
  }

  get template(): string {
    return createWalletComponentTemplate(this.state);
  }
}
