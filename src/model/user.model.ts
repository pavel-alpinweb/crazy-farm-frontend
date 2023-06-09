import { eventBus } from "../main";
import { DEFAULT_USER_DATA } from "../utils/constants";

declare global {
  interface UserData {
    userId: string;
    loggin: string;
    email: string;
  }

  interface RegistrationData {
    loggin: string;
    email: string;
    password: string;
  }

  interface LoginData {
    loggin: string;
    password: string;
  }
}

export default class User {
  private userId = DEFAULT_USER_DATA.userId;
  private userLogin = DEFAULT_USER_DATA.loggin;
  private userEmail = DEFAULT_USER_DATA.email;
  private isLoadingUserData = false;

  public get id(): string | undefined {
    if (this.userId) {
      return this.userId;
    }
  }
  public get login(): string {
    return this.userLogin;
  }
  public get email(): string {
    return this.userEmail;
  }

  public get loading(): boolean {
    return this.isLoadingUserData;
  }

  public get data(): UserData {
    return {
      userId: this.userId,
      loggin: this.userLogin,
      email: this.userEmail,
    };
  }

  public setUserData(data: UserData, isUpdateUI: boolean) {
    this.userLogin = data.loggin;
    this.userEmail = data.email;
    this.userId = data.userId;
    if (isUpdateUI) {
      eventBus.emit("User:update", this.data);
    }
  }

  public setLoading(value: boolean) {
    this.isLoadingUserData = value;
    eventBus.emit("User:loading", this.isLoadingUserData);
  }
}
