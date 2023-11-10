import {DEFAULT_FARM_STATE} from "../model/farm.model";

interface TutorialStep {
    cell: Cell;
    blockedTools: Array<tool>;
    isActive: boolean;
    needTools: Array<tool>;
}

const tutorialState: Array<TutorialStep> = [
    {
        cell: {
            isEmpty: false,
            isBlocked: false,
            name: "1-0",
            character: null,
        },
        blockedTools: [],
        isActive: false,
        needTools: [],
    },
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
        needTools: ["seeds"],
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
        needTools: ["bailer"],
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
        needTools: ["bailer"],
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
        needTools: ["fertilizer", "sprayer"],
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
        needTools: ["bailer", "fertilizer", "sprayer"],
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
        needTools: ["shovel"],
    },
    {
        cell: {
            isEmpty: false,
            isBlocked: false,
            name: "1-0",
            character: null,
        },
        blockedTools: [],
        isActive: true,
        needTools: [],
    },
];
const tutorialFarmStateCells: Array<Cell> = JSON.parse(JSON.stringify(DEFAULT_FARM_STATE.containers)).map((cell: Cell) => {
    if (cell.name !== "1-0") {
        cell.isBlocked = true;
    }
    return cell;
});
const finaleTutorialFarmStateCells: Array<Cell> = JSON.parse(JSON.stringify(DEFAULT_FARM_STATE.containers)).map((cell: Cell) => {
    cell.isBlocked = false;
    return cell;
});
const cellCurrent: Cell = <Cell>tutorialFarmStateCells.find((c) => c.name === "1-0");
const playerCash = 1000;
let currentStep = 1;
let blockedTools: Array<tool> = [
    "shovel",
    "bailer",
    "fertilizer",
    "sprayer",
];
let usedTools: Array<tool> = [];

const equals = (a: Array<tool>, b: Array<tool>) => {
    a.sort();
    b.sort();
    return a.length === b.length &&
        a.every((v, i) => v === b[i]);
};


export function updateTutorial(
    cell: string,
    tool: tool
): Promise<FarmResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const currentStepOld = currentStep;
            const usedToolsOld = usedTools;
            if (tool !== "empty" && !usedTools.includes(tool)) {
                usedTools.push(tool);
            }
            if (equals(usedTools, tutorialState[currentStep].needTools)) {
                currentStep = currentStepOld + 1;
                blockedTools = tutorialState[currentStep].blockedTools;
                cellCurrent.character = tutorialState[currentStep].cell.character;
                usedTools = [];
            } else {
                currentStep = currentStepOld;
                usedTools = usedToolsOld;
            }
            resolve({
                player: {
                    cash: playerCash,
                },
                tutorial: {
                    isActive: tutorialState[currentStep].isActive,
                    currentStep,
                    blockedTools,
                },
                containers: currentStep < 7 ? tutorialFarmStateCells : finaleTutorialFarmStateCells,
            });
        }, 100);
    });
}