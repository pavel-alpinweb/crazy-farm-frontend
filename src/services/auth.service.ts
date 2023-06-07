import Service from "../framework/Service";
import {AxiosResponse} from "axios";

declare global {
    interface UserResponse {
        jws: string;
        user: UserData;
    }
}

export default class AuthService {
    static async registrationFirstStep(data: UserData): Promise<AxiosResponse<string>> {
        return await Service.post('/users/registration/firstStep', data);
    }
}