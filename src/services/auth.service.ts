import Service from "../framework/Service";
import {AxiosResponse} from "axios";

const successMessage = 'Confirmation email sent to email';
declare global {
    interface UserResponse {
        jws: string;
        user: UserData;
    }
    type successMessage = typeof successMessage;
}

export default class AuthService {
    static async registrationFirstStep(data: UserData): Promise<successMessage> {
        const result: AxiosResponse<successMessage> =  await Service.post('/users/registration/firstStep', data);
        return result.data;
    }

    static async registrationFinalStep(token: string): Promise<UserResponse> {
        const result: AxiosResponse<UserResponse> = await Service.post('/users/registration/finalStep', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return result.data;
    }
}