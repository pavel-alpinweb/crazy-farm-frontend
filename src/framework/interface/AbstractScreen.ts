import {AbstractView} from "./AbstractView";
import {AbstractWidget} from "./AbstractWidget";

declare global {
    interface ScreenComponents {
        [key: string]: AbstractWidget | AbstractView | null;
    }
}

export abstract class AbstractScreen extends AbstractView {
    protected abstract components: ScreenComponents;
    protected abstract initComponents(): void;
    protected abstract renderComponents(): void;
}