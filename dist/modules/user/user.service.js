"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = __importDefault(require("../user/models/user.model"));
const error_exceptions_1 = require("../../utils/error.exceptions");
const friendRequest_model_1 = __importDefault(require("./models/friendRequest.model"));
const friendRequest_types_1 = require("./types/friendRequest.types");
class UserServices {
    async sendFriendRequest({ to, from }) {
        const receiver = await user_model_1.default.findById(to);
        if (!receiver) {
            throw new error_exceptions_1.NotFoundException("User not found");
        }
        if (to == from) {
            throw new error_exceptions_1.BadRequestException("Invalid user id");
        }
        const friendRequest = await friendRequest_model_1.default.findOne({
            status: {
                $in: [friendRequest_types_1.FriendRequestEnum.accepted, friendRequest_types_1.FriendRequestEnum.pending],
            },
            $or: [
                { from, to },
                { to: from, from: to },
            ],
        });
        if (friendRequest) {
            throw new error_exceptions_1.BadRequestException("Friend request already exist");
        }
        const request = await friendRequest_model_1.default.create({
            from,
            to,
        });
        return { RequestId: request.id };
    }
    async friendRequestReply({ id, status, userId }) {
        const friendRequest = await friendRequest_model_1.default.findById(id);
        if (!friendRequest) {
            throw new error_exceptions_1.NotFoundException("Friend request not found");
        }
        if (friendRequest.to.toString() != userId) {
            throw new error_exceptions_1.UnauthorizedException();
        }
        if (friendRequest.status != friendRequest_types_1.FriendRequestEnum.pending) {
            throw new error_exceptions_1.BadRequestException("Request status must be pending");
        }
        friendRequest.status = status;
        await friendRequest.save();
        return { data: {} };
    }
}
exports.UserServices = UserServices;
exports.default = new UserServices();
