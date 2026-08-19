import { ObjectId } from "mongoose";
import {
  sendFriendRequestData,
  friendRequestReplyData,
  cancelFriendRequestData,
} from "./friend.validation";
import User from "./models/friendRequest.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../utils/error.exceptions";
import FriendRequest from "./models/friendRequest.model";
import { FriendRequestEnum } from "./types/friendRequest.types";

export class friendRequestServices {
  async sendFriendRequest({
    to,
    from,
  }: sendFriendRequestData & { from: string }) {
    const receiver = await User.findById(to);
    if (!receiver) {
      throw new NotFoundException("User not found");
    }
    if (to == from) {
      throw new BadRequestException("Invalid user id");
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
    return { RequestId: request.id };
  }

  async friendRequestReply({
    id,
    status,
    userId,
  }: friendRequestReplyData & { userId: string }) {
    const friendRequest = await FriendRequest.findById(id);
    if (!friendRequest) {
      throw new NotFoundException("Friend request not found");
    }

    if (friendRequest.to.toString() != userId) {
      throw new UnauthorizedException();
    }

    if (friendRequest.status != FriendRequestEnum.pending) {
      throw new BadRequestException("Request status must be pending");
    }
    friendRequest.status = status;
    await friendRequest.save();
    return { data: {} };
  }

  async listFriendRequests(userId: string, sent?: boolean) {
    const filter: { to?: string; from?: string; status?: FriendRequestEnum } = {
      to: userId,
      status: FriendRequestEnum.pending,
    };
    if (sent) {
      delete filter.to;
      filter.from = userId;
    }
    const friendRequests = await FriendRequest.find(filter);

    return { friendRequests };
  }

  async cancelFriendRequest({
    userId,
    id,
  }: cancelFriendRequestData & { userId: string }) {
    const friendRequest = await FriendRequest.findById(id);
    if (!friendRequest) {
      throw new NotFoundException("Friend request not found");
    }

    if (friendRequest.from.toString() != userId) {
      throw new UnauthorizedException();
    }
    if (friendRequest.status != FriendRequestEnum.pending) {
      throw new BadRequestException("This friend request can not be canceled");
    }
    friendRequest.status = FriendRequestEnum.canceled;
    await friendRequest.save();

    return { data: {} };
  }

  async listFriends(userId: string) {
    const friendRequests = await FriendRequest.find({
      $or: [{ from: userId }, { to: userId }],
      status: FriendRequestEnum.accepted,
    }).populate([
      {
        path: "to",
        select: "email name phone",
        match: {
          _id: {
            $ne: userId,
          },
        },
      },
      {
        path: "from",
        select: "email name phone",
        match: {
          _id: {
            $ne: userId,
          },
        },
      },
    ]);

    const friends = friendRequests.map((req) => {
      return req.to || req.from;
    });
    return {
      friendRequests,
    };
  }
}

export default new friendRequestServices();
