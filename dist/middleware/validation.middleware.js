"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const error_exceptions_1 = require("../utils/error.exceptions");
const validation = (schema) => {
    return async (req, res, next) => {
        const keys = Object.keys(schema);
        const validationErrors = [];
        for (const key of keys) {
            if (schema[key]) {
                const validationRes = await schema[key].safeParseAsync(req[key]);
                if (!validationRes?.success) {
                    const errorWithKey = validationRes.error.issues.map((err) => ({
                        key,
                        ...err
                    }));
                    validationErrors.push(...errorWithKey);
                }
            }
        }
        if (validationErrors.length) {
            throw new error_exceptions_1.validationException(validationErrors);
        }
        else {
            return next();
        }
    };
};
exports.validation = validation;
