"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const user_model_1 = __importDefault(require("../user/models/user.model"));
const error_exceptions_1 = require("../../utils/error.exceptions");
const user_types_1 = require("../user/types/user.types");
const hashing_1 = require("../../utils/security/hashing");
const generateOtp_1 = require("../../utils/email/generateOtp");
const sendEmail_1 = require("../../utils/email/sendEmail");
const confirm_template_1 = require("../../utils/email/confirm.template");
const redis_service_1 = require("../../utils/redis/redis.service");
const token_1 = require("../../utils/security/token");
const nanoid_1 = require("nanoid");
const auth_middleware_1 = require("../../middleware/auth.middleware");
class AuthServices {
    async signup(data) {
        const { name, email, password, phone, age, gender, role, bio } = data;
        const userExist = await user_model_1.default.findOne({ email });
        if (userExist) {
            throw new error_exceptions_1.ConflictException("User Already Exists");
        }
        const userCreated = await user_model_1.default.create({
            name,
            email,
            password,
            phone,
            age,
            gender,
            role,
            bio: bio ? bio : "",
        });
        const otp = (0, generateOtp_1.generateOtp)();
        (0, sendEmail_1.sendEmail)({
            to: email,
            subject: "Confirm your email",
            html: (0, confirm_template_1.generateOtpHtml)(name, otp),
        });
        (0, redis_service_1.redisSet)((0, redis_service_1.generateOtpKey)(userCreated.id), otp, 5);
        return userCreated;
    }
    async confirmEmail(data) {
        const { email, otp } = data;
        const user = await user_model_1.default.findOne({
            email,
            confirmedAt: {
                $exists: false,
            },
        });
        if (!user) {
            throw new error_exceptions_1.BadRequestException("User not found");
        }
        const userOtp = await (0, redis_service_1.redisGet)((0, redis_service_1.generateOtpKey)(user.id));
        if (!userOtp) {
            throw new error_exceptions_1.BadRequestException("Otp expired");
        }
        if (userOtp != otp) {
            throw new error_exceptions_1.BadRequestException("Invalid Otp");
        }
        user.confirmedAt = new Date();
        await (0, redis_service_1.redisDel)((0, redis_service_1.generateOtpKey)(user.id));
        await user.save();
        return { data: {} };
    }
    async login(data) {
        const { email, password } = data;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new error_exceptions_1.UnauthorizedException("Invalid email or password");
        }
        if (user.provider > user_types_1.ProviderEnum.system) {
            throw new error_exceptions_1.BadRequestException("Use social login");
        }
        const matchedPassword = await (0, hashing_1.compare)(password, user.password);
        if (!matchedPassword) {
            throw new error_exceptions_1.UnauthorizedException("Invalid email or password");
        }
        const jwtAccess = process.env.ACCESS_JWT;
        const jwtidAccess = (0, nanoid_1.nanoid)(20);
        const jwtRefresh = process.env.REFRESH_JWT;
        const jwtidRefresh = (0, nanoid_1.nanoid)(20);
        if (jwtAccess && jwtRefresh) {
            const accessToken = (0, token_1.generateToken)({
                id: user.id,
            }, jwtAccess, {
                expiresIn: "30M",
                jwtid: jwtidAccess,
            });
            const refreshToken = (0, token_1.generateToken)({
                id: user.id,
            }, jwtRefresh, {
                expiresIn: "7D",
                jwtid: jwtidRefresh,
            });
            (0, redis_service_1.redisSet)((0, redis_service_1.jwtIdKey)(user.id, auth_middleware_1.Tokens.access), jwtidAccess, 30);
            (0, redis_service_1.redisSet)((0, redis_service_1.jwtIdKey)(user.id, auth_middleware_1.Tokens.refresh), jwtidRefresh, 7 * 60 * 24);
            return {
                accessToken,
                refreshToken,
            };
        }
    }
    async resendOtp(data) {
        const email = data.email;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new error_exceptions_1.NotFoundException("User Already Exists");
        }
        if (user.confirmedAt) {
            throw new error_exceptions_1.BadRequestException("Email already confirmed");
        }
        const oldOtp = await (0, redis_service_1.redisGet)((0, redis_service_1.generateOtpKey)(user.id));
        if (oldOtp) {
            const ttl = await (0, redis_service_1.redisTTL)((0, redis_service_1.generateOtpKey)(user.id));
            throw new error_exceptions_1.BadRequestException(`Wait for ${Math.ceil(ttl / 60)} minute(s) to resend the otp`);
        }
        const otp = (0, generateOtp_1.generateOtp)();
        (0, sendEmail_1.sendEmail)({
            to: email,
            subject: "Confirm your email",
            html: (0, confirm_template_1.generateOtpHtml)(user.name, otp),
        });
        (0, redis_service_1.redisSet)((0, redis_service_1.generateOtpKey)(user.id), otp, 5);
        return { data: {} };
    }
}
exports.AuthServices = AuthServices;
exports.default = new AuthServices();
