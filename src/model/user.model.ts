import { EventBus } from "../framework/EventBus";
import i18next from "i18next";

export const eventBusUser: EventBus = new EventBus();

const DEFAULT_USER_DATA: UserData = {
  userId: "crazyfarmid",
  loggin: "crazyfarmlogin",
  email: "crazyfarm@crazyfarm.crazyfarm",
};

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

  type language = 'en' | 'ru';
}

export default class User {
  private userId = DEFAULT_USER_DATA.userId;
  private userLogin = DEFAULT_USER_DATA.loggin;
  private userEmail = DEFAULT_USER_DATA.email;
  private isLoadingUserData = false;
  private userLanguage: language = 'ru';

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

  public get language(): language {
    return this.userLanguage;
  }

  public get data(): UserData {
    return {
      userId: this.userId,
      loggin: this.userLogin,
      email: this.userEmail,
    };
  }

  public setUserData(data: UserData, isUpdateUI = false) {
    this.userLogin = data.loggin;
    this.userEmail = data.email;
    this.userId = data.userId;
    if (isUpdateUI) {
      eventBusUser.emit("User:update", this.data);
    }
  }

  public setLoading(value: boolean) {
    this.isLoadingUserData = value;
    eventBusUser.emit("User:loading", this.isLoadingUserData);
  }

  public async setUserLanguage(value: language) {
    await i18next.changeLanguage(value);
    this.userLanguage = value;
    eventBusUser.emit("User:language", this.userLanguage);
  }
}
