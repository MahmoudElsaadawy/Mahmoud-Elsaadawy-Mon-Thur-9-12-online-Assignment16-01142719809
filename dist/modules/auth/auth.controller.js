"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const auth_services_1 = __importDefault(require("./auth.services"));
const authValidation = __importStar(require("./auth.validation"));
const success_response_1 = require("../../utils/success.response");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const routes = {
    base: "/auth",
    signup: "/signup",
    confirmEmail: "/confirm-email",
    login: "/login",
    resendEmailOtp: "/resend-email-otp",
    profile: "/profile"
};
router.post(routes.signup, (0, validation_middleware_1.validation)(authValidation.signupSchema), async (req, res) => {
    const signupData = req.body;
    const data = await auth_services_1.default.signup(signupData);
    (0, success_response_1.successResponse)({
        res,
        message: "User created successfully",
        data,
    });
});
router.patch(routes.confirmEmail, (0, validation_middleware_1.validation)(authValidation.confirmEmailSchema), async (req, res) => {
    const confirmEmailData = req.body;
    const data = await auth_services_1.default.confirmEmail(confirmEmailData);
    (0, success_response_1.successResponse)({
        res,
        message: "Email confirmed successfully",
        data,
    });
});
router.post(routes.login, (0, validation_middleware_1.validation)(authValidation.loginSchema), async (req, res) => {
    const loginData = req.body;
    const data = await auth_services_1.default.login(loginData);
    (0, success_response_1.successResponse)({
        res,
        message: "Logged in successfully",
        data,
    });
});
router.patch(routes.resendEmailOtp, (0, validation_middleware_1.validation)(authValidation.resendOtpSchema), async (req, res) => {
    const resendData = req.body;
    const data = await auth_services_1.default.resendOtp(resendData);
    (0, success_response_1.successResponse)({
        res,
        message: "Otp sent successfully",
        data,
    });
});
router.get(routes.profile, auth_middleware_1.auth, (req, res) => {
    const user = req.user;
    (0, success_response_1.successResponse)({
        res,
        data: {
            user
        },
    });
});
exports.default = router;
