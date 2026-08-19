import mongoose from "mongoose";
import { IPost, PostPrivacyEnum } from "../types/post.types";

export const postSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: function(this) {
      return this.attachments.length == 0
    }
  },
  attachments: {
    type: [String]
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: "User"
  },
  privacy: {
    type: Number,
    default: PostPrivacyEnum.public
  },
  comments: {
    type: [mongoose.Types.ObjectId],
    ref: "Comment"
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
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
  },
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;