import {AbstractView} from "./AbstractView";

declare global {
    interface ScreenComponents {
        [key: string]: AbstractView | null;
    }
}

export abstract class AbstractScreen extends AbstractView {
    protected abstract components: ScreenComponents;
    protected abstract setState(props: object): void;
    protected abstract initComponents(): void;
}