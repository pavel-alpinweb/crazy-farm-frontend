import { AxiosResponse } from "axios";
import Service from "../framework/Service";
import Cookies from "js-cookie";

declare global {
  interface Jws {
    jws: string;
  }
}

export default class FarmService {
  static async getJwtForConnection(token: string): Promise<Jws> {
    const result: AxiosResponse<Jws> = await Service.get(
      "/game/getJwtForConnection",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "accept-language": Cookies.get("crazy-farm-lang") ?? "en",
        },
      }
    );

    return result.data;
  }
}
