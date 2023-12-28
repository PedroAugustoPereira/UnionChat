export default class AppError extends Error {
    statusValue: string | undefined | boolean;
    isOperacional?: boolean;

    constructor(
        public message: string,
        public statusCode: number = 500,
        public status: boolean,
    ) {
        super(message);
        this.statusValue = status;
        this.isOperacional = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
