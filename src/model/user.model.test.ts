import User from "./user.model";
import { DEFAULT_USER_DATA } from "../utils/constants";

describe("User Model getters:", () => {
  const user = new User();

  test("Getter user.userId", () => {
    expect(user.id).toBe(DEFAULT_USER_DATA.userId);
  });

  test("Getter user.login", () => {
    expect(user.login).toBe(DEFAULT_USER_DATA.loggin);
  });

  test("Getter user.email", () => {
    expect(user.email).toBe(DEFAULT_USER_DATA.email);
  });

  test("Getter user.password", () => {
    expect(user.password).toBe(DEFAULT_USER_DATA.password);
  });

  test("Getter user.data", () => {
    expect(user.data).toEqual(DEFAULT_USER_DATA);
  });
});
