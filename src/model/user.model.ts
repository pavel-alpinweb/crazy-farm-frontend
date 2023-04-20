export default class User {
    private userLogin = 'login';
    private userPassword = 'password';
    private userEmail = 'email';

    public get login() {
        return this.userLogin;
    }
    public get password() {
        return this.userPassword;
    }
    public get email() {
        return this.userEmail;
    }
}
