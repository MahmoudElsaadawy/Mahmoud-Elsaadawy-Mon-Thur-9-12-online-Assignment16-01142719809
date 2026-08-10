"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const auth_services_1 = __importDefault(require("./auth.services"));
const auth_validation_1 = require("./auth.validation");
const success_response_1 = require("../../utils/success.response");
const router = (0, express_1.Router)();
const routes = {
    base: "/auth",
    signup: "/signup",
    confirmEmail: "/confirm-email",
    login: "/login",
};
router.post(routes.signup, (0, validation_middleware_1.validation)(auth_validation_1.signupSchema), async (req, res) => {
    const signupData = req.body;
    const data = await auth_services_1.default.signup(signupData);
    (0, success_response_1.successResponse)({
        res,
        message: "User created successfully",
        data: data,
    });
});
router.patch(routes.confirmEmail, (0, validation_middleware_1.validation)(auth_validation_1.confirmEmailSchema), async (req, res) => {
    const confirmEmailData = req.body;
    const data = await auth_services_1.default.confirmEmail(confirmEmailData);
    (0, success_response_1.successResponse)({
        res,
        message: "Email confirmed successfully",
        data: data,
    });
});
router.post(routes.login, (0, validation_middleware_1.validation)(auth_validation_1.loginSchema), async (req, res) => {
    const loginData = req.body;
    const data = await auth_services_1.default.login(loginData);
    (0, success_response_1.successResponse)({
        res,
        message: "Logged in successfully",
        data: data,
    });
});
exports.default = router;
