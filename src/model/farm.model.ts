import { AbstractStaticSprite } from "../framework/graphics/AbstractStaticSprite";
import { AbstractAnimatedSprite } from "../framework/graphics/AbstractAnimatedSprite";
import { EventBus } from "../framework/EventBus";

export const eventBusFarm: EventBus = new EventBus();

export const TOOLS: Tools = {
  SHOVEL: "shovel",
  BAILER: "bailer",
  FERTILIZER: "fertilizer",
  SPRAYER: "sprayer",
  SEEDS: "seeds",
  EMPTY: "empty",
};
export const DEFAULT_FARM_STATE: FarmState = {
  containers: [
    {
      isEmpty: true,
      isBlocked: false,
      name: "central",
      character: {
        type: "empty",
        stage: 0,
        needs: [],
      },
    },
  ],
};
export const CHARACTERS_NEEDS: CharactersNeeds = {
  HUNGER: "HUNGER",
  SICKNESS: "SICKNESS",
  THIRST: "THIRST",
};

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

  interface Player {
    cash: number;
  }

  interface FarmData {
    farm: FarmState;
    activeTool: tool;
    player: Player;
  }
}

export default class FarmModel {
  private initialState: FarmData = {
    farm: DEFAULT_FARM_STATE,
    activeTool: TOOLS.EMPTY,
    player: {
      cash: 1000,
    },
  };

  public get state(): FarmState {
    return this.initialState.farm;
  }

  public get player(): Player {
    return this.initialState.player;
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
    eventBusFarm.emit("Farm:set_tool", this.initialState.activeTool);
  }

  public setFarmState(data: FarmState): void {
    if (JSON.stringify(data) !== JSON.stringify(this.state)) {
      this.initialState.farm = data;
      eventBusFarm.emit("Farm:update", this.initialState.farm);
    }
  }
}
