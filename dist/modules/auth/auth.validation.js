"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtpSchema = exports.confirmEmailSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_types_1 = require("../user/types/user.types");
exports.signupSchema = {
    body: zod_1.default.strictObject({
        name: zod_1.default.string(),
        email: zod_1.default.email(),
        password: zod_1.default
            .string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[-!@#$%^&*(()_])(?=.*[0-9]).{8,}$/),
        phone: zod_1.default.string(),
        age: zod_1.default.number(),
        gender: zod_1.default.union([zod_1.default.literal(user_types_1.GenderEnum.male), zod_1.default.literal(user_types_1.GenderEnum.female)]),
        isOnline: zod_1.default.boolean().optional(),
        isActive: zod_1.default.boolean().optional(),
        provider: zod_1.default.number().optional(),
        role: zod_1.default.union([zod_1.default.literal(user_types_1.RoleEnum.user), zod_1.default.literal(user_types_1.RoleEnum.admin)]),
        bio: zod_1.default.string().optional(),
    }),
};
exports.loginSchema = {
    body: zod_1.default.strictObject({
        email: zod_1.default.email(),
        password: zod_1.default
            .string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[-!@#$%^&*(()_])(?=.*[0-9]).{8,}$/),
    }),
};
exports.confirmEmailSchema = {
    body: zod_1.default.strictObject({
        email: zod_1.default.email(),
        otp: zod_1.default.string().min(6).max(6),
    }),
};
exports.resendOtpSchema = {
    body: zod_1.default.strictObject({
        email: zod_1.default.email(),
    }),
};
