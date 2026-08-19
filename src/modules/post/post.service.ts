import PostModel from "./models/post.model";
import { createPostData } from "./post.validation";
import FriendRequest from "../friendRequests/models/friendRequest.model";
import { FriendRequestEnum } from "../friendRequests/types/friendRequest.types";
import { HUser } from "../user/types/user.types";
import { PostPrivacyEnum } from "./types/post.types";
import userServices from "../user/user.service";

class postServices {
  async createPost({
    content,
    title,
    privacy,
    userId,
  }: createPostData & { userId: string }) {
    const post = await PostModel.create({
      content,
      title,
      privacy: privacy as number,
      createdBy: userId,
    });
    return { data: { post } };
  }

  async getPostsByUserId(userId: string, user: HUser) {
    const isFriends = await FriendRequest.findOne({
      status: FriendRequestEnum.accepted,
      $or: [
        {
          to: userId,
          from: user._id,
        },
        {
          from: user._id,
          to: userId,
        },
      ],
    });

    const postsPrivacy = [{ privacy: PostPrivacyEnum.public }];
    if (isFriends) {
      postsPrivacy.push({ privacy: PostPrivacyEnum.friends });
    }
    if (userId == user.id) {
      postsPrivacy.push(
        { privacy: PostPrivacyEnum.friends },
        { privacy: PostPrivacyEnum.private },
      );
    }

    console.log(postsPrivacy);
    const posts = await PostModel.find({
      createdBy: userId,
      $or: postsPrivacy,
    });

    return { posts };
  }

  async getHomePagePosts(user: HUser) {
    const friends = (
      await userServices.listFriends(user.id)
    ).friendRequests.map((friend) => friend.id);
    const postsPrivacy = [
      { privacy: PostPrivacyEnum.public },
      { privacy: PostPrivacyEnum.friends, createdBy: { $in: friends } },
      {
        privacy: { $in: [PostPrivacyEnum.friends, PostPrivacyEnum.private] },
        createdBy: user._id,
      },
    ];

    const posts = await PostModel.find({ $or: postsPrivacy });
    return posts;
  }
}

export default new postServices();
