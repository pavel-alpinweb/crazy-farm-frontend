import User from "./user.model";
// import { DEFAULT_USER_DATA } from "../utils/constants";

describe("User Model getters:", () => {
    test("doesn't throw error when constructed", () => {
        expect(() => {
            const testMyClass = new User();
        }).not.toThrowError();
    });
});
