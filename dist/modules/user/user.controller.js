"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const success_response_1 = require("../../utils/success.response");
const user_service_1 = __importDefault(require("./user.service"));
const router = (0, express_1.Router)();
exports.routes = {
    base: "/users",
    myProfile: "/profile",
    listFriends: "/list-friends",
};
router.get(exports.routes.myProfile, auth_middleware_1.auth, (req, res) => {
    const user = req.user;
    (0, success_response_1.successResponse)({
        res,
        data: {
            user,
        },
    });
});
router.get(exports.routes.listFriends, auth_middleware_1.auth, async (req, res) => {
    const userId = req.user.id;
    const data = await user_service_1.default.listFriends(userId);
    (0, success_response_1.successResponse)({
        res,
        data,
    });
});
exports.default = router;
