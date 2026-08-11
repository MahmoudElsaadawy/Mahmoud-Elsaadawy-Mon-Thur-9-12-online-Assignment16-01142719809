"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.validationException = exports.ConflictException = exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    validationErrors;
    constructor(message, options, statusCode, validationErrors) {
        super(message, options);
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
    }
}
exports.AppError = AppError;
class NotFoundException extends AppError {
    constructor(message = "Not found", options = {}) {
        super(message, options, 404);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends AppError {
    constructor(message, options = {}) {
        super(message, options, 400);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends AppError {
    constructor(message = "You are not authorized to preform this action", options = {}) {
        super(message, options, 401);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ConflictException extends AppError {
    constructor(message, options = {}) {
        super(message, options, 409);
    }
}
exports.ConflictException = ConflictException;
class validationException extends AppError {
    constructor(validationErrors, options = {}) {
        super("Validation error", options, 422, validationErrors);
    }
}
exports.validationException = validationException;
const globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        Message: err.message,
        validationError: err.validationErrors,
        status: err.statusCode,
        stack: err.stack
    });
};
exports.globalErrorHandler = globalErrorHandler;
