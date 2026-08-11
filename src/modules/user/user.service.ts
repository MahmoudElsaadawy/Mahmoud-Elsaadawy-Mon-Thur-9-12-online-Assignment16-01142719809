import { ObjectId } from "mongoose";
import { sendFriendRequestData, friendRequestReplyData } from "./user.validation";
import User from "../user/models/user.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../utils/error.exceptions";
import FriendRequest from "./models/friendRequest.model";
import { FriendRequestEnum } from "./types/friendRequest.types";

export class UserServices {
  async sendFriendRequest({ to, from }: sendFriendRequestData & {from: string}) {
    const receiver = await User.findById(to);
    if (!receiver) {
      throw new NotFoundException("User not found");
    }
    if (to == from) {
      throw new BadRequestException("Invalid user id")
    }
    const friendRequest = await FriendRequest.findOne({
      status: {
        $in: [FriendRequestEnum.accepted, FriendRequestEnum.pending],
      },
      $or: [
        { from, to },
        { to: from, from: to },
      ],
    });
    if (friendRequest) {
      throw new BadRequestException("Friend request already exist");
    }
    const request = await FriendRequest.create({
      from,
      to,
    });
    return {RequestId: request.id}
  }

  async friendRequestReply ({ id, status, userId }: friendRequestReplyData & {userId: string}) {
    const friendRequest = await FriendRequest.findById(id)
    if(!friendRequest) {
      throw new NotFoundException("Friend request not found")
    }

    if(friendRequest.to.toString() != userId) {
      throw new UnauthorizedException()
    }

    if(friendRequest.status != FriendRequestEnum.pending) {
      throw new BadRequestException("Request status must be pending")
    }
    friendRequest.status = status
    await friendRequest.save()
    return {data: {}}
  }
}

export default new UserServices();
