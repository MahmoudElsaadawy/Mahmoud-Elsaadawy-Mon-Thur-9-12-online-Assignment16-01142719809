"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelFriendRequestSchema = exports.friendRequestReplySchema = exports.sendFriendRequestSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
const friendRequest_types_1 = require("./types/friendRequest.types");
exports.sendFriendRequestSchema = {
    body: zod_1.default.strictObject({
        to: zod_1.default.string().refine((value) => {
            return (0, mongoose_1.isValidObjectId)(value);
        }, { error: "Invalid id value" }),
    }),
};
exports.friendRequestReplySchema = {
    body: zod_1.default.strictObject({
        status: zod_1.default.union([
            zod_1.default.literal(friendRequest_types_1.FriendRequestEnum.accepted),
            zod_1.default.literal(friendRequest_types_1.FriendRequestEnum.rejected),
        ]),
    }),
    params: zod_1.default.strictObject({
        id: zod_1.default.string().refine((value) => {
            return (0, mongoose_1.isValidObjectId)(value);
        }, { error: "Invalid id value" }),
    }),
};
exports.cancelFriendRequestSchema = {
    params: zod_1.default.strictObject({
        id: zod_1.default.string().refine((value) => {
            return (0, mongoose_1.isValidObjectId)(value);
        }, { error: "Invalid id value" }),
    }),
};
