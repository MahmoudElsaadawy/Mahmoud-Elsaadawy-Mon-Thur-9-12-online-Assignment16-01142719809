"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../post/models/post.model"));
const error_exceptions_1 = require("../../utils/error.exceptions");
const comment_model_1 = __importDefault(require("./models/comment.model"));
class commentServices {
    async createComment(postId, user, text, attachments) {
        const post = await post_model_1.default.findById(postId);
        if (!post) {
            throw new error_exceptions_1.NotFoundException("Post not found");
        }
        const comment = await comment_model_1.default.create({
            text: text ? text : "",
            attachments: attachments ? attachments : [],
            createdBy: user._id
        });
        post.comments.push(comment._id);
        await post.save();
        return comment;
    }
}
exports.default = new commentServices();
