import moment from 'moment';
export class Error {
    payload: any;
    statusCode: number;

    constructor(statusCode: number, errors: any[]) {
        this.statusCode = statusCode;
        this.payload = {
            timestamp: moment(),
            errors: errors
        }
    }
};

/**
 * Bad Request Error
 */
export class BadRequestError extends Error {
    constructor(errors: any[]) {
        super(400, errors);
    }
};

/**
 * Unauthorized Error
 */
export class UnauthorizedError extends Error {
    constructor(error?: string) {
        super(401, [
            error ? error : "UNAUTHORIZED_ERROR"
        ]);
    }
};

/**
 * Forbidden Error
 */
export class ForbiddenError extends Error {
    constructor() {
        super(403, [
            "FORBIDDEN_ERROR"
        ]);
    }
};

/**
 * Not Found Error
 */
export class NotFoundError extends Error {
    constructor(error: string) {
        super(404, [
            error
        ]);
    }
};

/**
 * Internal Server Error
 */
export class InternalServerError extends Error {
    constructor(error?: string) {
        super(500, [
             `Internal Server Error: ${error}` 
        ]);
    }
};


/**
 * Not Implemented Error
 */
export class NotImplementedError extends Error {
    constructor(error?: string) {
        super(501, [
            `Not Implemented: ${error}` 
        ]);
    }
};

/**
 * Service Unavailable Error
 */
export class ServiceUnavailableError extends Error {
    constructor(error?: string) {
        super(502, [
            `Service Unavailable: ${error}`
        ]);
    }
};
