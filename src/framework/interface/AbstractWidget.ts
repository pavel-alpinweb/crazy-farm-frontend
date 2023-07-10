import { AbstractView } from "./AbstractView";

declare global {
  interface WidgetComponents {
    [key: string]: AbstractView | null;
  }
}

export abstract class AbstractWidget extends AbstractView {
  protected abstract components: WidgetComponents;
  protected abstract initComponents(): void;
  protected abstract renderComponents(): void;
  protected updateWidget() {
    this.rerenderElement();
    this.initComponents();
    this.setEvents();
    this.renderComponents();
  }
  protected mountComponent(
    slot: string,
    component: AbstractView | null,
    position: InsertPosition = AbstractView.positions.BEFOREEND
  ): void {
    this.element
      ?.querySelector(`[data-slot-${slot}]`)
      ?.insertAdjacentElement(position, <Element>component?.element);
  }
}
