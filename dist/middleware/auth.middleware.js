"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.auth = exports.Tokens = void 0;
const error_exceptions_1 = require("../utils/error.exceptions");
const token_1 = require("../utils/security/token");
const user_model_1 = __importDefault(require("../modules/user/models/user.model"));
const redis_service_1 = require("../utils/redis/redis.service");
var Tokens;
(function (Tokens) {
    Tokens["access"] = "accessToken";
    Tokens["refresh"] = "refreshToken";
})(Tokens || (exports.Tokens = Tokens = {}));
const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    const { user } = await (0, exports.decodeToken)(authorization, Tokens.access);
    req.user = user;
    next();
};
exports.auth = auth;
const decodeToken = async (authorization, tokenType = Tokens.access) => {
    if (!authorization) {
        throw new error_exceptions_1.UnauthorizedException();
    }
    if (!authorization.startsWith("Bearer")) {
        throw new error_exceptions_1.BadRequestException("Invalid authorization method");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        throw new error_exceptions_1.UnauthorizedException();
    }
    const jwtKey = tokenType == Tokens.refresh ? process.env.REFRESH_JWT : process.env.ACCESS_JWT;
    if (!jwtKey) {
        throw new error_exceptions_1.BadRequestException("Env key not found");
    }
    const payload = (0, token_1.verifyToken)(token, jwtKey);
    const user = await user_model_1.default.findById(payload.id);
    if (!user) {
        throw new error_exceptions_1.UnauthorizedException();
    }
    if (!user.confirmedAt) {
        throw new error_exceptions_1.BadRequestException("Please confirm your email first");
    }
    const redisAccessKey = (0, redis_service_1.jwtIdKey)(user.id, tokenType);
    const redisJti = await (0, redis_service_1.redisGet)(redisAccessKey);
    if (redisJti != payload.jti) {
        throw new error_exceptions_1.UnauthorizedException();
    }
    return { user };
};
exports.decodeToken = decodeToken;
