"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, sign, options = {}) => {
    const token = jsonwebtoken_1.default.sign(payload, sign, options);
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token, sign, options = {}) => {
    const payload = jsonwebtoken_1.default.verify(token, sign, options);
    return payload;
};
exports.verifyToken = verifyToken;
