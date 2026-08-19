"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByUserIdValidation = exports.createPostValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
exports.createPostValidation = {
    body: zod_1.default.strictObject({
        title: zod_1.default.string(),
        content: zod_1.default.string(),
        privacy: zod_1.default.union([
            zod_1.default.literal(0),
            zod_1.default.literal(1),
            zod_1.default.literal(2),
        ]).optional()
    })
};
exports.getPostsByUserIdValidation = {
    params: zod_1.default.strictObject({
        id: zod_1.default.string().refine((value) => {
            return (0, mongoose_1.isValidObjectId)(value);
        }, { error: "Invalid id value" }),
    })
};
