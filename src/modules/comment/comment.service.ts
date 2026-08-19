import PostModel from "../post/models/post.model";
import { HUser } from "../user/types/user.types";
import { NotFoundException } from "../../utils/error.exceptions";
import CommentModel from "./models/comment.model";

class commentServices {
  async createComment(postId: string, user: HUser, text?: string, attachments?: Array<string>){
    const post = await PostModel.findById(postId)
    if(!post) {
      throw new NotFoundException("Post not found")
    }
    const comment = await CommentModel.create({
      text: text? text : "",
      attachments: attachments? attachments : [],
      createdBy: user._id
    })
    post.comments.push(comment._id)
    await post.save()
    return comment
  }
}

export default new commentServices();
