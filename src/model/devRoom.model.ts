export const TOOLS: Tools = {
  SHOVEL: "shovel",
  BAILER: "bailer",
  FERTILIZER: "fertilizer",
  SPRAYER: "sprayer",
  SEEDS: "seeds",
  EMPTY: "empty",
};

export const TEST_FARM_STATE: FarmState = {
  containers: [
    {
      isEmpty: true,
      isBlocked: false,
      name: "0-0",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "1-0",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "2-0",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "3-0",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "0-1",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "1-1",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "2-1",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "3-1",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "0-2",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "1-2",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "2-2",
      character: null,
    },
    {
      isEmpty: true,
      isBlocked: false,
      name: "3-2",
      character: null,
    },
  ],
};

export default class FarmModel {
  private initialState: FarmData = {
    farm: TEST_FARM_STATE,
    activeTool: TOOLS.EMPTY,
    player: {
      cash: 0,
    },
  };

  public get state(): FarmState {
    return this.initialState.farm;
  }
}
