import Service from "../framework/Service";

declare global {
    interface UserResponse {
        jws: string;
        user: UserData;
    }
}

export default class AuthService {
    static async test() {
        return await Service.get('/todos/1');
    }
}