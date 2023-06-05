declare global {
    interface ErrorMessage {
        message: string;
    }
    interface HttpError {
        timestamp: string;
        httpStatus: string;
        httpErrorCode: number;
        reasons: Array<ErrorMessage>,
    }
}