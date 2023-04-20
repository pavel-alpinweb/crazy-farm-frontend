declare global {
  interface userData {
    login: string;
    password: string;
    email: string;
  }
}

export default class User {
  private userLogin = "login";
  private userPassword = "password";
  private userEmail = "email";

  public get login(): string {
    return this.userLogin;
  }
  public get password(): string {
    return this.userPassword;
  }
  public get email(): string {
    return this.userEmail;
  }

  public get data(): userData {
    return {
      login: this.userLogin,
      password: this.userPassword,
      email: this.userEmail,
    };
  }
}
