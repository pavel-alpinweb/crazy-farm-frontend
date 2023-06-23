import {DEFAULT_FARM_STATE, TOOLS} from "../utils/constants";
import { AbstractStaticSprite } from "../framework/graphics/AbstractStaticSprite";
import { AbstractAnimatedSprite } from "../framework/graphics/AbstractAnimatedSprite";
import { eventBus } from "../main";

declare global {
  interface Character {
    type: string;
    stage: number;
    needs: need;
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
    farm: FarmState,
    activeTool: tool,
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
    this.initialState.activeTool = tool;
    eventBus.emit("Farm:set_tool", this.initialState.activeTool);
  }

  public setFarmState(data: FarmState): void {
    this.initialState.farm = data;
    eventBus.emit("Farm:update", this.initialState.farm);
  }
}
