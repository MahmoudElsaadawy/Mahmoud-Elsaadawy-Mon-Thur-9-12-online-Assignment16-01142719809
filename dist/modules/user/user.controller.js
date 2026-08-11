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
exports.routes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const success_response_1 = require("../../utils/success.response");
const user_service_1 = __importDefault(require("./user.service"));
const validation_middleware_1 = require("../../middleware/validation.middleware");
const userValidation = __importStar(require("./user.validation"));
const router = (0, express_1.Router)();
exports.routes = {
    base: "/users",
    myProfile: "/profile",
    sendFriendRequest: "/send-friend-request",
    friendRequestReply: "/friend-request-reply/:id",
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
router.post(exports.routes.sendFriendRequest, (0, validation_middleware_1.validation)(userValidation.sendFriendRequestSchema), auth_middleware_1.auth, async (req, res) => {
    const { to } = req.body;
    const { id: from } = req.user;
    const data = await user_service_1.default.sendFriendRequest({ to, from });
    (0, success_response_1.successResponse)({
        res,
        message: "Friend request sent successfully",
        data
    });
});
router.patch(exports.routes.friendRequestReply, (0, validation_middleware_1.validation)(userValidation.friendRequestReplySchema), auth_middleware_1.auth, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { id: userId } = req.user;
    await user_service_1.default.friendRequestReply({ id, status, userId });
    (0, success_response_1.successResponse)({
        res,
        message: "Friend request action taken successfully",
    });
});
exports.default = router;
