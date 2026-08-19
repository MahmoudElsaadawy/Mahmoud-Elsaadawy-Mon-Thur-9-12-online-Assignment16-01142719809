import mongoose from "mongoose";
import {
  FriendRequestEnum,
  IFriendRequest,
} from "../types/friendRequest.types";

const friendRequestESchema = new mongoose.Schema<IFriendRequest>(
  {
    from: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    to: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: Number,
      default: FriendRequestEnum.pending,
    },
  },
  {
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
  },
);

const friendRequestModel = mongoose.model(
  "FriendRequest",
  friendRequestESchema,
);

export default friendRequestModel;
