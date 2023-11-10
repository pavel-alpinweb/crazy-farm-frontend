import {DEFAULT_FARM_STATE} from "../model/farm.model";

const tutorialState = [
    {},
    {
        cell: {
            isEmpty: true,
            isBlocked: false,
            name: "1-0",
            character: null,
        },
        blockedTools: [
            "shovel",
            "bailer",
            "fertilizer",
            "sprayer",
        ],
        isActive: true,
    },
    {
        cell: {
            isEmpty: false,
            isBlocked: false,
            name: "1-0",
            character: {
                type: 'potato',
                stage: 0,
                needs: [],
            },
        },
        blockedTools: [
            "shovel",
            "seeds",
            "fertilizer",
            "sprayer",
        ],
        isActive: true,
    },
    {
        cell: {
            isEmpty: false,
            isBlocked: false,
            name: "1-0",
            character: {
                type: 'potato',
                stage: 1,
                needs: ["THIRST"],
            },
        },
        blockedTools: [
            "shovel",
            "seeds",
            "fertilizer",
            "sprayer",
        ],
        isActive: true,
    },
    {
        cell: {
            isEmpty: false,
            isBlocked: false,
            name: "1-0",
            character: {
                type: 'potato',
                stage: 2,
                needs: ["HUNGER", "SICKNESS"],
            },
        },
        blockedTools: [
            "shovel",
            "bailer",
            "seeds",
        ],
        isActive: true,
    },
    {
        cell: {
            isEmpty: false,
            isBlocked: false,
            name: "1-0",
            character: {
                type: 'potato',
                stage: 3,
                needs: ["THIRST", "HUNGER", "SICKNESS"],
            },
        },
        blockedTools: [
            "shovel",
            "seeds",
        ],
        isActive: true,
    },
    {
        cell: {
            isEmpty: false,
            isBlocked: false,
            name: "1-0",
            character: {
                type: 'potato',
                stage: 4,
                needs: [],
            },
        },
        blockedTools: [
            "bailer",
            "fertilizer",
            "sprayer",
            "seeds",
        ],
        isActive: true,
    },
    {
        cell: {
            isEmpty: false,
            isBlocked: false,
            name: "1-0",
            character: null,
        },
        blockedTools: [],
        isActive: false,
    },
];
const tutorialFarmStateCells: Array<Cell> = JSON.parse(JSON.stringify(DEFAULT_FARM_STATE.containers)).map((cell: Cell) => {
    if (cell.name !== "1-0") {
        cell.isBlocked = true;
    }
    return cell;
});
const playerCash = 1000;
const currentStep = 1;
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
                    currentStep,
                    blockedTools,
                },
                containers: tutorialFarmStateCells,
            });
        }, 1000);
    });
}