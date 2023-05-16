import { AbstractView } from "./AbstractView";
import { AbstractWidget } from "./AbstractWidget";
import { AbstractScene } from "../graphics/AbstractScene";

declare global {
  interface ScreenComponents {
    [key: string]: AbstractWidget | AbstractView | AbstractScene | null;
  }
}

export abstract class AbstractScreen extends AbstractView {
  protected abstract components: ScreenComponents;
  protected abstract initComponents(): void;
  protected abstract renderComponents(): void;
}
