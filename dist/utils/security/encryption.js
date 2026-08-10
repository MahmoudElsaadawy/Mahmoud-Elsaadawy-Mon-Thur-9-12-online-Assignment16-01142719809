"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const error_exceptions_1 = require("../error.exceptions");
const crypto_js_1 = __importDefault(require("crypto-js"));
const encrypt = (data) => {
    const encKey = process.env.ENC_KEY;
    if (encKey) {
        const encryptedData = crypto_js_1.default.AES.encrypt(data, encKey);
        return encryptedData.toString();
    }
    throw new error_exceptions_1.BadRequestException("ENC_KEY env variable is not defined");
};
exports.encrypt = encrypt;
const decrypt = (encryptedData) => {
    const encKey = process.env.ENC_KEY;
    if (encKey) {
        const decryptedData = crypto_js_1.default.AES.decrypt(encryptedData, encKey);
        return decryptedData.toString(crypto_js_1.default.enc.Utf8);
    }
    throw new error_exceptions_1.BadRequestException("ENC_KEY env variable is not defined");
};
exports.decrypt = decrypt;
