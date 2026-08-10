"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const nanoid_1 = require("nanoid");
const generateOtp = () => {
    const randomInt = (0, nanoid_1.customAlphabet)("0123456789");
    return randomInt(6);
};
exports.generateOtp = generateOtp;
