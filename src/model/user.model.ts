import { eventBus } from "../main";

declare global {
  interface UserData {
    userId: string;
    login: string;
    email: string;
    password?: string;
  }
}

export default class User {
  private userId = "crazyfarmid";
  private userLogin = "crazyfarmlogin";
  private userPassword = "crazyfarmpassword";
  private userEmail = "crazyfarm@crazyfarm.crazyfarm";

  public get id(): string {
    return this.userId;
  }

  public get login(): string {
    return this.userLogin;
  }
  public get password(): string {
    return this.userPassword;
  }
  public get email(): string {
    return this.userEmail;
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
