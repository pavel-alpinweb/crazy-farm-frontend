import { eventBus } from "../main";
import {DEFAULT_USER_DATA} from "../utils/constants";

declare global {
  interface UserData {
    userId: string;
    login: string;
    email: string;
    password?: string;
  }
}

export default class User {
  private userId = DEFAULT_USER_DATA.userId;
  private userLogin = DEFAULT_USER_DATA.login;
  private userEmail = DEFAULT_USER_DATA.email;
  private userPassword = DEFAULT_USER_DATA.password;

  public get id(): string {
    return this.userId;
  }
  public get login(): string {
    return this.userLogin;
  }
  public get email(): string {
    return this.userEmail;
  }
  public get password(): string | undefined {
    return this.userPassword;
  }

  public get data(): UserData {
    return {
      userId: this.userId,
      login: this.userLogin,
      password: this.userPassword,
      email: this.userEmail
    };
  }

  public setUserData(data: UserData, isUpdateUI: boolean) {
    this.userLogin = data.login;
    this.userEmail = data.email;
    this.userId = data.userId;
    if (data.password) {
      this.userPassword = data.password;
    }
    if (isUpdateUI) {
      eventBus.emit("User:update", this.data);
    }
  }
}
