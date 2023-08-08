import {TOOLS, CHARACTERS_NEEDS } from "../model/farm.model";
import {TOOLS_PRICES} from "../model/farm.model";

let activeCharacter = "empty";
let activeStage = 0;
let activeNeeds: Array<need> = [];
let playerCash = 10;

export function updateFarmState(cell: string, tool: tool): Promise<FarmResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (tool) {
        case TOOLS.SEEDS:
          activeCharacter = "potato";
          activeStage = 1;
          activeNeeds = [CHARACTERS_NEEDS.HUNGER, CHARACTERS_NEEDS.THIRST, CHARACTERS_NEEDS.SICKNESS];
          playerCash -= TOOLS_PRICES[TOOLS.SEEDS];
          break;
        case TOOLS.SHOVEL:
          if (activeCharacter !== "empty") {
            playerCash += 10;
          }
          activeCharacter = "empty";
          activeNeeds = [];
          activeStage = 0;
          break;
        case TOOLS.BAILER:
          if (activeCharacter !== "empty") {
            activeNeeds = activeNeeds.filter((need) => need !== CHARACTERS_NEEDS.THIRST);
          }
          break;
        case TOOLS.FERTILIZER:
          if (activeCharacter !== "empty") {
            activeNeeds = activeNeeds.filter((need) => need !== CHARACTERS_NEEDS.HUNGER);
            playerCash -= TOOLS_PRICES[TOOLS.FERTILIZER];
          }
          break;
        case TOOLS.SPRAYER:
          if (activeCharacter !== "empty") {
            activeNeeds = activeNeeds.filter((need) => need !== CHARACTERS_NEEDS.SICKNESS);
            playerCash -= TOOLS_PRICES[TOOLS.SPRAYER];
          }
          break;
        default:
          break;
      }
      resolve({
        player: {
          cash: playerCash,
        },
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
