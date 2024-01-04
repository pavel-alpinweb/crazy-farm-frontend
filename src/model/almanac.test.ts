import {AlmanacModel} from "./almanac.model";

describe("Almanac Model:", () => {
    test("doesn't throw error when Almanac Model constructed", () => {
        expect(() => {
            new AlmanacModel();
        }).not.toThrowError();
    });
});