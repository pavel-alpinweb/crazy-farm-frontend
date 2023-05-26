import { AbstractView } from "./AbstractView";
import { AbstractWidget } from "./AbstractWidget";
import { AbstractScene } from "../graphics/AbstractScene";

declare global {
  interface ScreenComponents {
    [key: string]: AbstractWidget | AbstractView | AbstractScene | null;
  }
}

export abstract class AbstractScreen extends AbstractView {
  protected abstract controllerMethods: Methods;
  protected abstract components: ScreenComponents;
  protected abstract initComponents(): void;
  protected abstract renderComponents(): void;
  protected mountComponent(
    slot: string,
    component: AbstractWidget | AbstractView | AbstractScene | null,
    position: InsertPosition = AbstractView.positions.BEFOREEND
  ): void {
    this.element
      ?.querySelector(`[data-slot-${slot}]`)
      ?.insertAdjacentElement(position, <Element>component?.element);
  }
}
