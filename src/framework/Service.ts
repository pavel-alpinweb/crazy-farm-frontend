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
  static instanceOfHttpError(object: any): object is HttpError {
    return (
        "httpStatus" in object &&
        "timestamp" in object &&
        "httpErrorCode" in object &&
        "reasons" in object
    );
  }
}