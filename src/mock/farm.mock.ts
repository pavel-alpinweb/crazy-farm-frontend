import {TOOLS, CHARACTERS_NEEDS } from "../model/farm.model";
import {TOOLS_PRICES} from "../utils/constants";

let activeCharacter = "empty";
let activeNeeds: Array<need> = [];
let playerCash = 200;

export function updateFarmState(cell: string, tool: tool): Promise<FarmResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (tool) {
        case TOOLS.SEEDS:
          activeCharacter = "potato";
          activeNeeds = [CHARACTERS_NEEDS.HUNGER, CHARACTERS_NEEDS.THIRST, CHARACTERS_NEEDS.SICKNESS];
          playerCash -= TOOLS_PRICES[TOOLS.SEEDS];
          break;
        case TOOLS.SHOVEL:
          activeCharacter = "empty";
          activeNeeds = [];
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
              stage: 1,
              needs: activeNeeds,
            },
          },
        ],
      });
    }, 2000);
  });
}
