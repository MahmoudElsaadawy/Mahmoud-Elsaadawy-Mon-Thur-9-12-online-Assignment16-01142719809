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
const validation_middleware_1 = require("../../middleware/validation.middleware");
const success_response_1 = require("../../utils/success.response");
const postValidation = __importStar(require("./post.validation"));
const post_service_1 = __importDefault(require("./post.service"));
const router = (0, express_1.Router)();
exports.routes = {
    base: "/posts",
    createPost: "/",
    getPosts: "/userid/:id",
    homePosts: "/home"
};
router.post(exports.routes.createPost, auth_middleware_1.auth, (0, validation_middleware_1.validation)(postValidation.createPostValidation), async (req, res) => {
    const userId = req.user.id;
    const { content, title, privacy } = req.body;
    const data = await post_service_1.default.createPost({ content, title, privacy, userId });
    (0, success_response_1.successResponse)({
        res,
        data,
    });
});
router.get(exports.routes.getPosts, auth_middleware_1.auth, (0, validation_middleware_1.validation)(postValidation.getPostsByUserIdValidation), async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const data = await post_service_1.default.getPostsByUserId(id, user);
    (0, success_response_1.successResponse)({
        res,
        data,
    });
});
router.get(exports.routes.homePosts, auth_middleware_1.auth, async (req, res) => {
    const user = req.user;
    const data = await post_service_1.default.getHomePagePosts(user);
    (0, success_response_1.successResponse)({
        res,
        data,
    });
});
exports.default = router;
