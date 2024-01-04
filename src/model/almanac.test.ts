import {AlmanacModel} from "./almanac.model";

describe("Almanac Model:", () => {
    test("doesn't throw error when Almanac Model constructed", () => {
        expect(() => {
            new AlmanacModel();
        }).not.toThrowError();
    });

    test("method: setTutorialState", () => {
        const almanac = new AlmanacModel();

        almanac.setTutorialState({
            isActive: true,
            currentStep: 1,
            blockedTools: ["shovel", "bailer"],
        });

        expect(almanac.tutorial).toEqual({
            isActive: true,
            currentStep: 1,
            blockedTools: ["shovel", "bailer"],
        });

        expect(almanac.state).toEqual({
            isShow: true,
            isActive: false,
            currentTextKey: 'tutorial.1',
            currentActions: ["close"],
        });
    });
});