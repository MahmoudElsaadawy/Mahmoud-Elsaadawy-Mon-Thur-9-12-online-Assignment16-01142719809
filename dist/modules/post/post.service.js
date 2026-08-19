"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("./models/post.model"));
const friendRequest_model_1 = __importDefault(require("../friendRequests/models/friendRequest.model"));
const friendRequest_types_1 = require("../friendRequests/types/friendRequest.types");
const post_types_1 = require("./types/post.types");
const user_service_1 = __importDefault(require("../user/user.service"));
class postServices {
    async createPost({ content, title, privacy, userId, }) {
        const post = await post_model_1.default.create({
            content,
            title,
            privacy: privacy,
            createdBy: userId,
        });
        return { data: { post } };
    }
    async getPostsByUserId(userId, user) {
        const isFriends = await friendRequest_model_1.default.findOne({
            status: friendRequest_types_1.FriendRequestEnum.accepted,
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
        const postsPrivacy = [{ privacy: post_types_1.PostPrivacyEnum.public }];
        if (isFriends) {
            postsPrivacy.push({ privacy: post_types_1.PostPrivacyEnum.friends });
        }
        if (userId == user.id) {
            postsPrivacy.push({ privacy: post_types_1.PostPrivacyEnum.friends }, { privacy: post_types_1.PostPrivacyEnum.private });
        }
        console.log(postsPrivacy);
        const posts = await post_model_1.default.find({
            createdBy: userId,
            $or: postsPrivacy,
        });
        return { posts };
    }
    async getHomePagePosts(user) {
        const friends = (await user_service_1.default.listFriends(user.id)).friendRequests.map((friend) => friend.id);
        const postsPrivacy = [
            { privacy: post_types_1.PostPrivacyEnum.public },
            { privacy: post_types_1.PostPrivacyEnum.friends, createdBy: { $in: friends } },
            {
                privacy: { $in: [post_types_1.PostPrivacyEnum.friends, post_types_1.PostPrivacyEnum.private] },
                createdBy: user._id,
            },
        ];
        const posts = await post_model_1.default.find({ $or: postsPrivacy });
        return posts;
    }
}
exports.default = new postServices();
