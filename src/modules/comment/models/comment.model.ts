import mongoose from "mongoose";
import { IComment } from "../types/comment.types";

export const commentSchema = new mongoose.Schema<IComment>({
  text: {
    type: String,
    required: function(this) {
      return !this.attachments || this.attachments.length == 0
    }
  },
  attachments: {
    type: [String]
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: "User"
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

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;