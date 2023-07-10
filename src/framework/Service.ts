import axios from "axios";
import Cookies from "js-cookie";

declare global {
  interface ErrorMessage {
    message: string;
  }
  interface HttpError {
    timestamp: string;
    httpStatus: string;
    httpErrorCode: number;
    reasons: Array<ErrorMessage>;
  }
}

export default class Service {
  static readonly BASE_API_URL = "https://crazyfarm.herokuapp.com";
  static readonly HTTP = axios.create({
    baseURL: Service.BASE_API_URL,
    headers: {
      Authorization: "Bearer ",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  static instanceOfHttpError(object: any): object is HttpError {
    return (
      "httpStatus" in object &&
      "timestamp" in object &&
      "httpErrorCode" in object &&
      "reasons" in object
    );
  }
  static async get(url: string, params?: object) {
    return await Service.HTTP.get(url, params);
  }
  static async post(url: string, data: object, settings?: object) {
    return await Service.HTTP.post(url, data, settings);
  }
  static setToken(value: string) {
    Cookies.set("crazy-farm-jws", value, { expires: 7 });
  }
  static getToken(): string | undefined {
    return Cookies.get("crazy-farm-jws");
  }
}
