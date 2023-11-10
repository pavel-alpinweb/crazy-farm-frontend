import { EventBus } from "../framework/EventBus";

declare global {
  type AlmanacAction = "show" | "close";

  interface AlmanacState {
    isActive: boolean;
    isShow: boolean;
    currentTextKey: string;
    currentActions: AlmanacAction[];
  }

  interface Tutorial {
    isActive: boolean;
    currentStep: number;
    blockedTools: Array<tool>;
  }
}

export const eventBusAlmanac: EventBus = new EventBus();

export class AlmanacModel {
  private almanacState: AlmanacState = {
    isActive: false,
    isShow: false,
    currentTextKey: "almanacDefault",
    currentActions: ["show", "close"],
  };

  private tutorialState: Tutorial = {
    isActive: false,
    currentStep: 0,
    blockedTools: [],
  };

  public get state(): AlmanacState {
    return this.almanacState;
  }

  public get tutorial(): Tutorial{
    return this.tutorialState;
  }

  public toggleAlmanac(): void {
    this.almanacState.isShow = !this.almanacState.isShow;
    if (this.tutorial.isActive) {
      this.almanacState.currentTextKey = `tutorial.${this.tutorialState.currentStep}`;
      this.almanacState.currentActions = ["close"];
    }
    eventBusAlmanac.emit("Almanac:toggleView", this.state);
  }

  public activateAlmanac(): void {
    this.almanacState.currentActions = ["show", "close"];
    this.almanacState.isShow = false;
    this.almanacState.isActive = true;
    this.almanacState.currentTextKey = "almanacDefault";
    eventBusAlmanac.emit("Almanac:activate", this.state.isActive);
    eventBusAlmanac.emit("Almanac:toggleView", this.state);
  }

  public deactivateAlmanac(): void {
    this.almanacState.isShow = false;
    this.almanacState.isActive = false;
    this.almanacState.currentTextKey = "almanacDefault";
    this.almanacState.currentActions = [];
    eventBusAlmanac.emit("Almanac:activate", this.state.isActive);
    eventBusAlmanac.emit("Almanac:toggleView", this.state);
  }

  public setAlmanacDataForTools(tool: tool): void {
    this.almanacState.currentActions = ["show", "close"];
    this.almanacState.isShow = true;
    this.almanacState.isActive = false;
    this.almanacState.currentTextKey = `tools.${tool}`;
    eventBusAlmanac.emit("Almanac:activate", this.state.isActive);
    eventBusAlmanac.emit("Almanac:toggleView", this.state);
  }

  public setAlmanacDataForCharacter(cell: Cell): void {
    this.almanacState.currentActions = ["show", "close"];
    this.almanacState.isShow = true;
    this.almanacState.isActive = false;
    if (cell.character) {
      this.almanacState.currentTextKey = `character.${cell.character.type}.${cell.character.stage}`;
    } else {
      this.almanacState.currentTextKey = "character.empty";
    }
    eventBusAlmanac.emit("Almanac:activate", this.state.isActive);
    eventBusAlmanac.emit("Almanac:toggleView", this.state);
  }

  public setTutorialState(state: Tutorial): void {
    this.tutorialState = state;
    this.almanacState.isShow = true;
    this.almanacState.isActive = false;
    this.almanacState.currentTextKey = `tutorial.${this.tutorialState.currentStep}`;
    this.almanacState.currentActions = ["close"];
    eventBusAlmanac.emit("Almanac:toggleView", this.state);
    eventBusAlmanac.emit("Tutorial:update", this.tutorialState);
  }
}
