import {EventBus} from "../framework/EventBus";

const eventBus: EventBus = new EventBus();

const DEFAULT_USER_DATA: UserData = {
    userId: "crazyfarmid",
    loggin: "crazyfarmlogin",
    email: "crazyfarm@crazyfarm.crazyfarm",
};

export class TestModel {
    private userId = DEFAULT_USER_DATA.userId;
    private userLogin = DEFAULT_USER_DATA.loggin;
    private userEmail = DEFAULT_USER_DATA.email;
    private isLoadingUserData = false;

    public setUserData(data: UserData, isUpdateUI: boolean) {
        this.userLogin = data.loggin;
        this.userEmail = data.email;
        this.userId = data.userId;
        if (isUpdateUI) {
            eventBus.emit("User:update", {
                userId: this.userId,
                loggin: this.userLogin,
                email: this.userEmail,
            });
        }
    }
}