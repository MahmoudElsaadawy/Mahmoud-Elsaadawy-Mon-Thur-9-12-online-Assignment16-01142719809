"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtIdKey = exports.generateOtpKey = exports.redisKeys = exports.redisTTL = exports.redisDel = exports.redisGet = exports.redisSet = void 0;
const redis_connection_1 = require("../../DB/redis.connection");
const redisSet = async (path, value, time) => {
    return await redis_connection_1.redisClient.set(path, value, {
        expiration: {
            type: "EX",
            value: time * 60,
        }
    });
};
exports.redisSet = redisSet;
const redisGet = (path) => {
    return redis_connection_1.redisClient.get(path);
};
exports.redisGet = redisGet;
const redisDel = (path) => {
    return redis_connection_1.redisClient.del(path);
};
exports.redisDel = redisDel;
const redisTTL = (path) => {
    return redis_connection_1.redisClient.TTL(path);
};
exports.redisTTL = redisTTL;
const redisKeys = (path) => {
    return redis_connection_1.redisClient.keys(path);
};
exports.redisKeys = redisKeys;
const generateOtpKey = (userId) => {
    return `Users:${userId}:confirmEmailOtp`;
};
exports.generateOtpKey = generateOtpKey;
const jwtIdKey = (userId, tokenType) => {
    return `Users:${userId}:login:${tokenType}`;
};
exports.jwtIdKey = jwtIdKey;
