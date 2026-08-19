"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.commentSchema = new mongoose_1.default.Schema({
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
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true
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
const commentModel = mongoose_1.default.model("Comment", exports.commentSchema);
exports.default = commentModel;
