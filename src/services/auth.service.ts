import Service from "../framework/Service";

declare global {
    interface UserResponse {
        jws: string;
        user: UserData;
    }
}

export default class AuthService {
    static async test(data: object) {
        return await Service.post('/posts', data);
    }
}