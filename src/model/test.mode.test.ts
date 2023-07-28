import {TestModel} from "./test.model";

describe("User Model getters:", () => {
    test("doesn't throw error when constructed", () => {
        expect(() => {
            const testMyClass = new TestModel();
        }).not.toThrowError();
    });
});