import Service from "../framework/Service";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const successMessage = "Confirmation email sent to email";
declare global {
  interface UserResponse {
    jws: string;
    user: UserData;
  }
  type successMessage = typeof successMessage;
}

export default class AuthService {
  static async registrationFirstStep(data: UserData): Promise<successMessage> {
    const result: AxiosResponse<successMessage> = await Service.post(
      "/users/registration/firstStep",
      data,
      {
        headers: {
          "accept-language": Cookies.get("crazy-farm-lang") ?? "en",
        },
      }
    );
    return result.data;
  }

  static async registrationFinalStep(token: string): Promise<UserResponse> {
    const result: AxiosResponse<UserResponse> = await Service.post(
      "/users/registration/finalStep",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "accept-language": Cookies.get("crazy-farm-lang") ?? "en",
        },
      }
    );
    return result.data;
  }

  static async enter(data: UserData): Promise<UserResponse> {
    const result: AxiosResponse<UserResponse> = await Service.post(
      "/users/enter",
      data,
      {
        headers: {
          "accept-language": Cookies.get("crazy-farm-lang") ?? "en",
        },
      }
    );
    return result.data;
  }

  static async GoogleRegistration(credential: string): Promise<UserResponse> {
    const result: AxiosResponse<UserResponse> = await Service.post(
      "/users/registration/google",
      {},
      {
        headers: {
          Authorization: credential,
          "accept-language": Cookies.get("crazy-farm-lang") ?? "en",
        },
      }
    );
    return result.data;
  }

  static async GoogleEnter(credential: string): Promise<UserResponse> {
    const result: AxiosResponse<UserResponse> = await Service.post(
      "/users/enter/google",
      {},
      {
        headers: {
          Authorization: credential,
          "accept-language": Cookies.get("crazy-farm-lang") ?? "en",
        },
      }
    );
    return result.data;
  }
}
