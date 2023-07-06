import { AxiosResponse } from "axios";
import Service from "../framework/Service";

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
        },
      }
    );

    return result.data;
  }
}
