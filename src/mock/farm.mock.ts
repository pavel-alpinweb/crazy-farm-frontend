import {CHARACTERS_NEEDS} from "../utils/constants";

export function updateFarmState(): Promise<FarmState> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        containers: [
          {
            isEmpty: false,
            isBlocked: false,
            name: "central",
            character: {
              type: "potato",
              stage: 1,
              needs: CHARACTERS_NEEDS.GOOD,
            },
          },
        ],
      });
    }, 2000);
  });
}
