"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const friendRequest_types_1 = require("../types/friendRequest.types");
const friendRequestESchema = new mongoose_1.default.Schema({
    from: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "User",
    },
    to: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: Number,
        default: friendRequest_types_1.FriendRequestEnum.pending,
    },
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
const friendRequestModel = mongoose_1.default.model("FriendRequest", friendRequestESchema);
exports.default = friendRequestModel;
