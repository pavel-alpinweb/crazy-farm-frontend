import {TOOLS, CHARACTERS_NEEDS } from "../model/farm.model";

let activeCharacter = "empty";
let activeNeeds: Array<need> = [];

export function updateFarmState(cell: string, tool: tool): Promise<FarmResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (tool) {
        case TOOLS.SEEDS:
          activeCharacter = "potato";
          activeNeeds = [CHARACTERS_NEEDS.HUNGER, CHARACTERS_NEEDS.THIRST, CHARACTERS_NEEDS.SICKNESS];
          break;
        case TOOLS.SHOVEL:
          activeCharacter = "empty";
          activeNeeds = [];
          break;
        case TOOLS.BAILER:
          if (activeCharacter === "potato") {
            activeNeeds = activeNeeds.filter((need) => need !== CHARACTERS_NEEDS.THIRST);
          }
          break;
        default:
          break;
      }
      resolve({
        player: {
          cash: 0,
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
