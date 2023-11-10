import {DEFAULT_FARM_STATE} from "../model/farm.model";

const tutorialFarmStateCells: Array<Cell> = JSON.parse(JSON.stringify(DEFAULT_FARM_STATE.containers)).map((cell: Cell) => {
    if (cell.name !== "1-0") {
        cell.isBlocked = true;
    }
    return cell;
});
const playerCash = 1000;
const blockedTools: Array<tool> = [
    "shovel",
    "bailer",
    "fertilizer",
    "sprayer",
    // "seeds",
];

export function updateTutorial(
    cell: string,
    tool: tool
): Promise<FarmResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                player: {
                    cash: playerCash,
                },
                tutorial: {
                    isActive: true,
                    currentStep: 0,
                    blockedTools,
                },
                containers: tutorialFarmStateCells,
            });
        }, 1000);
    });
}