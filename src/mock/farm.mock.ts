import { TOOLS, CHARACTERS_NEEDS } from "../model/farm.model";
import { TOOLS_PRICES } from "../model/farm.model";
import {DEFAULT_FARM_STATE} from "../model/farm.model";

let activeCharacter = "empty";
let activeStage = 0;
let activeNeeds: Array<need> = [];
let playerCash = 50;
const mutatedState = JSON.parse(JSON.stringify(DEFAULT_FARM_STATE));

export function updateFarmState(
  cell: string,
  tool: tool
): Promise<FarmResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (tool) {
        case TOOLS.SEEDS:
          activeCharacter = "tomato";
          activeStage = 4;
          activeNeeds = [
            CHARACTERS_NEEDS.HUNGER,
            CHARACTERS_NEEDS.THIRST,
            CHARACTERS_NEEDS.SICKNESS,
          ];
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
            activeNeeds = activeNeeds.filter(
              (need) => need !== CHARACTERS_NEEDS.THIRST
            );
          }
          break;
        case TOOLS.FERTILIZER:
          if (activeCharacter !== "empty") {
            activeNeeds = activeNeeds.filter(
              (need) => need !== CHARACTERS_NEEDS.HUNGER
            );
            playerCash -= TOOLS_PRICES[TOOLS.FERTILIZER];
          }
          break;
        case TOOLS.SPRAYER:
          if (activeCharacter !== "empty") {
            activeNeeds = activeNeeds.filter(
              (need) => need !== CHARACTERS_NEEDS.SICKNESS
            );
            playerCash -= TOOLS_PRICES[TOOLS.SPRAYER];
          }
          break;
        default:
          break;
      }
      const modelCell = mutatedState.containers.find((c: any) => c.name === cell);
      if (modelCell) {
        modelCell.character ={
          type: activeCharacter,
          stage: activeStage,
          needs: activeNeeds,
        };
      }
      resolve({
        player: {
          cash: playerCash,
        },
        containers: mutatedState.containers,
      });
    }, 2000);
  });
}
