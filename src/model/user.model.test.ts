import User from "./user.model";

describe("User Model:", () => {
    const userModel = new User();

    test("doesn't throw error when User Model constructed", () => {
        expect(() => {
            const testMyClass = new User();
        }).not.toThrowError();
    });

    test("method: setUserData", () => {
        const result: UserData = {
            userId: "alpinweb",
            loggin: "alpinweb",
            email: "alpinweb@yandex.ru",
        };
        userModel.setUserData(result);
        expect(userModel.data).toEqual(result);
    });

    test("method: setLoading", () => {
        userModel.setLoading(true);
        expect(userModel.loading).toBe(true);
    });
});
