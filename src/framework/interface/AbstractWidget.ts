import {AbstractView} from "./AbstractView";

declare global {
    interface WidgetComponents {
        [key: string]: AbstractView | null;
    }
}

export abstract class AbstractWidget extends AbstractView {
    protected abstract components: WidgetComponents;
    protected abstract initComponents(): void;
    protected abstract renderComponents(): void;
}