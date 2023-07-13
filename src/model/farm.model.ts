import { DEFAULT_FARM_STATE, TOOLS } from "../utils/constants";
import { AbstractStaticSprite } from "../framework/graphics/AbstractStaticSprite";
import { AbstractAnimatedSprite } from "../framework/graphics/AbstractAnimatedSprite";
import { eventBus } from "../main";

declare global {
  type tool =
    | "shovel"
    | "bailer"
    | "fertilizer"
    | "sprayer"
    | "seeds"
    | "empty";
  interface Tools {
    SHOVEL: "shovel";
    BAILER: "bailer";
    FERTILIZER: "fertilizer";
    SPRAYER: "sprayer";
    SEEDS: "seeds";
    EMPTY: "empty";
  }
  type need = "HUNGER" | "SICKNESS" | "THIRST";
  interface CharactersNeeds {
    HUNGER: "HUNGER";
    SICKNESS: "SICKNESS";
    THIRST: "THIRST";
  }
  interface Character {
    type: string;
    stage: number;
    needs: Array<need>;
  }
  interface Cell {
    isEmpty: boolean;
    isBlocked: boolean;
    name: string;
    character: Character | null;
  }
  interface FarmState {
    containers: Array<Cell>;
  }
  interface CharactersSprites {
    [key: string]: Array<
      { new (): AbstractStaticSprite } | { new (): AbstractAnimatedSprite }
    >;
  }

  interface FarmData {
    farm: FarmState;
    activeTool: tool;
  }
}

export default class FarmModel {
  private initialState: FarmData = {
    farm: DEFAULT_FARM_STATE,
    activeTool: TOOLS.EMPTY,
  };

  public get state(): FarmState {
    return this.initialState.farm;
  }

  public get tool(): tool {
    return this.initialState.activeTool;
  }

  public setActiveTool(tool: tool) {
    if (this.initialState.activeTool !== tool) {
      this.initialState.activeTool = tool;
    } else {
      this.initialState.activeTool = TOOLS.EMPTY;
    }
    eventBus.emit("Farm:set_tool", this.initialState.activeTool);
  }

  public setFarmState(data: FarmState): void {
    if (JSON.stringify(data) !== JSON.stringify(this.state)) {
      this.initialState.farm = data;
      eventBus.emit("Farm:update", this.initialState.farm);
    }
  }
}
