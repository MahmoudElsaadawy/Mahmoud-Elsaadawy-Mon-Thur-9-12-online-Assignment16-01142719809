"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
exports.createCommentValidation = {
    params: zod_1.default.strictObject({
        postId: zod_1.default.string().refine((value) => {
            return (0, mongoose_1.isValidObjectId)(value);
        }, { error: "Invalid id value" }),
    }),
    body: zod_1.default
        .strictObject({
        text: zod_1.default.string().optional(),
        attachment: zod_1.default.string().optional(),
    })
        .refine((data) => Boolean(data.text || data.attachment), {
        error: "text or attachment must be provided",
    }),
};
