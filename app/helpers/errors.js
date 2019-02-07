import httpStatus from 'http-status';

export class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        Error.captureStackTrace(this, this.constructor.name);
    }
}

export class HttpForbiddenError extends HttpError {
    constructor(message) {
        super(message || httpStatus[httpStatus.FORBIDDEN], httpStatus.FORBIDDEN);
    }
}
export class HttpUnauthotizedError extends HttpError {
    constructor(message) {
        super(message || httpStatus[httpStatus.UNAUTHORIZED], httpStatus.UNAUTHORIZED);
    }
}

export class HttpNotFoundError extends HttpError {
    constructor(message) {
        super(message || httpStatus[httpStatus.NOT_FOUND], httpStatus.NOT_FOUND);
    }
}

export class HttpBadRequestError extends HttpError {
    constructor(message) {
        super(message || httpStatus[httpStatus.BAD_REQUEST], httpStatus.BAD_REQUEST);
    }
}

export class HttpServerError extends HttpError {
    constructor(message) {
        super(message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR], httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class HttpUnprocessableEntityError extends HttpError {
    constructor(message, details) {
        super(message || httpStatus[httpStatus.UNPROCESSABLE_ENTITY], httpStatus.UNPROCESSABLE_ENTITY);
        this.details = details;
    }
}
