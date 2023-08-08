import FarmModel, { TOOLS_PRICES } from "./farm.model";
import { TOOLS, CHARACTERS_NEEDS } from "./farm.model";

describe("Farm Model:", () => {
  test("doesn't throw error when User Model constructed", () => {
    expect(() => {
      new FarmModel();
    }).not.toThrowError();
  });

  test("method setActiveTool set new tool", () => {
    const farmModel = new FarmModel();
    const tools: tool[] = [
      "shovel",
      "bailer",
      "fertilizer",
      "sprayer",
      "seeds",
      "empty",
    ];
    for (const tool of tools) {
      farmModel.setActiveTool(tool);
      expect(farmModel.tool).toBe(tool);
    }
  });
  test("method setActiveTool reset tool", () => {
    const farmModel = new FarmModel();
    const tools: tool[] = [
      "shovel",
      "bailer",
      "fertilizer",
      "sprayer",
      "seeds",
      "empty",
    ];
    for (const tool of tools) {
      farmModel.setActiveTool(tool);
      farmModel.setActiveTool(tool);
      expect(farmModel.tool).toBe(TOOLS.EMPTY);
    }
  });
  test("method setActiveTool doesn't change tool if it price higher than player's cash value", () => {
    const farmModel = new FarmModel();
    const tools: tool[] = [
      "shovel",
      "bailer",
      "fertilizer",
      "sprayer",
      "seeds",
      "empty",
    ];
    let activeTool: tool = TOOLS.EMPTY;
    farmModel.setActiveTool(activeTool);
    farmModel.setPlayerCash(0);
    for (const tool of tools) {
      farmModel.setActiveTool(tool);
      if (farmModel.player.cash < TOOLS_PRICES[tool]) {
        expect(farmModel.tool).toBe(activeTool);
      } else {
        activeTool = tool;
        expect(farmModel.tool).toBe(activeTool);
      }
    }
  });
  test("method setFarmState set correct state", () => {
    const farmModel = new FarmModel();
    const result: FarmState = {
      containers: [
        {
          isEmpty: true,
          isBlocked: false,
          name: "central",
          character: {
            type: "potato",
            stage: 1,
            needs: [CHARACTERS_NEEDS.HUNGER],
          },
        },
      ],
    };

    farmModel.setFarmState(result);
    expect(farmModel.state).toEqual(result);
  });
  test("method setPlayerCash set correct cash value", () => {
    const farmModel = new FarmModel();
    const result = 1000;
    farmModel.setPlayerCash(result);
    expect(farmModel.player.cash).toBe(result);
  });
  test("method setPlayerCash reset active tool to empty if player cash is empty", () => {
    const farmModel = new FarmModel();
    farmModel.setPlayerCash(0);
    expect(farmModel.tool).toBe(TOOLS.EMPTY);
  });
  test("method setPlayerCash reset active tool to empty if player cash lower than active tool price", () => {
    const farmModel = new FarmModel();

    farmModel.setActiveTool(TOOLS.SEEDS);
    farmModel.setPlayerCash(1);
    expect(farmModel.tool).toBe(TOOLS.EMPTY);
  });
});
