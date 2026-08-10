"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.compare = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const compare = async (data, hashedData) => {
    return await bcrypt_1.default.compare(data, hashedData);
};
exports.compare = compare;
const hash = async (data) => {
    const hashedValue = await bcrypt_1.default.hash(data, 8);
    return hashedValue;
};
exports.hash = hash;
