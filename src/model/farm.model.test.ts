import FarmModel from "./farm.model";

describe("Farm Model:", () => {
    const farmModel = new FarmModel();

    test("doesn't throw error when User Model constructed", () => {
        expect(() => {
            const testMyClass = new FarmModel();
        }).not.toThrowError();
    });
});