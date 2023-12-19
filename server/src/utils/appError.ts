export default class AppError extends Error {
    status: string | undefined;
    isOperacional?: boolean;

    constructor(
        public message: string,
        public statusCode: number = 500,
    ) {
        super(message);
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperacional = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
