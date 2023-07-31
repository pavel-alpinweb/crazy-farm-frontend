import FarmModel from "./farm.model";
import { TOOLS, CHARACTERS_NEEDS } from "./farm.model";

describe("Farm Model:", () => {
  const farmModel = new FarmModel();

  test("doesn't throw error when User Model constructed", () => {
    expect(() => {
      new FarmModel();
    }).not.toThrowError();
  });

  test("method: setActiveTool: new tool", () => {
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
  test("method: setActiveTool: reset tool", () => {
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
  test("method: setFarmState", () => {
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
});
