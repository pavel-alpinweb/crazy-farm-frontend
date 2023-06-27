import { CHARACTERS_NEEDS, TOOLS } from "../utils/constants";

let activeCharacter = "empty";
let activeStage = 0;
let activeNeeds: Array<need> = [];

export function updateFarmState(cell: string, tool: tool): Promise<FarmState> {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (tool) {
        case TOOLS.SEEDS:
          activeCharacter = "potato";
          activeNeeds.push(CHARACTERS_NEEDS.THIRST);
          break;
        case TOOLS.SHOVEL:
          activeCharacter = "empty";
          activeStage = 0;
          activeNeeds = [];
          break;
        case TOOLS.BAILER:
          if (activeCharacter === "potato") {
            activeStage++;
            activeNeeds = [];
          }
          break;
        default:
          break;
      }
      resolve({
        containers: [
          {
            isEmpty: false,
            isBlocked: false,
            name: "central",
            character: {
              type: activeCharacter,
              stage: activeStage,
              needs: activeNeeds,
            },
          },
        ],
      });
    }, 2000);
  });
}
