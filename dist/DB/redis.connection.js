"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const chalk_1 = __importDefault(require("chalk"));
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URI || "redis://127.0.0.1:6379",
});
exports.redisClient.on("connect", () => console.log(chalk_1.default.bgGreen("Redis connected successfully")));
exports.redisClient.on("error", (e) => console.log(chalk_1.default.bgRed("Redis connection failed: ", e)));
