import {DEFAULT_FARM_STATE} from "../model/farm.model";

const tutorialFarmStateCells: Array<Cell> = JSON.parse(JSON.stringify(DEFAULT_FARM_STATE.containers)).map((cell: Cell) => {
    if (cell.name !== "1-0") {
        cell.isBlocked = true;
    }
    return cell;
});
const playerCash = 1000;

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
                    isActive: false,
                    currentStep: 0,
                    blockedTools: [],
                },
                containers: tutorialFarmStateCells,
            });
        }, 2000);
    });
}