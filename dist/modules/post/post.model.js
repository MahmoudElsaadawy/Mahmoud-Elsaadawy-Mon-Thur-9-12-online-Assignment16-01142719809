"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const post_types_1 = require("./types/post.types");
exports.postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: function () {
            return this.attachments.length == 0;
        }
    },
    attachments: {
        type: [String]
    },
    likes: {
        type: [mongoose_1.default.Types.ObjectId],
        ref: "User"
    },
    privacy: {
        type: Number,
        default: post_types_1.PostPrivacyEnum.public
    }
}, {
    timestamps: true,
    strictQuery: true,
    strict: true,
    optimisticConcurrency: true,
    toJSON: {
        getters: true,
    },
    toObject: {
        getters: true,
    },
});
const postModel = mongoose_1.default.model("Post", exports.postSchema);
exports.default = postModel;
