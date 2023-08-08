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

const TOOLS_PRICES = {
  [TOOLS.EMPTY]: 0,
  [TOOLS.BAILER]: 0,
  [TOOLS.FERTILIZER]: 1,
  [TOOLS.SPRAYER]: 2,
  [TOOLS.SHOVEL]: 0,
  [TOOLS.SEEDS]: 3,
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
  interface ToolData {
    name: tool;
    price: number;
  }
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
  
  interface FarmResponse {
    containers: Array<Cell>;
    player: Player;
  }
}

export default class FarmModel {
  private initialState: FarmData = {
    farm: DEFAULT_FARM_STATE,
    activeTool: TOOLS.EMPTY,
    player: {
      cash: 10,
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
    if (this.player.cash < TOOLS_PRICES[tool]) return;
    if (this.initialState.activeTool !== tool) {
      this.initialState.activeTool = tool;
    } else {
      this.initialState.activeTool = TOOLS.EMPTY;
    }
    eventBusFarm.emit("Farm:set_tool", this.initialState.activeTool);
  }

  public setFarmState(data: FarmState): void {
    if (JSON.stringify(data) !== JSON.stringify(this.state)) {
      this.initialState.farm.containers = data.containers;
      eventBusFarm.emit("Farm:update", this.initialState.farm);
    }
  }

  public setPlayerCash(cash: number): void {
    if (cash !== this.player.cash) {
      this.initialState.player.cash = cash;
      if (this.player.cash === 0) {
        this.setActiveTool(TOOLS.EMPTY);
      }
      eventBusFarm.emit("Farm:update_wallet", this.player.cash);
    }
  }
}
