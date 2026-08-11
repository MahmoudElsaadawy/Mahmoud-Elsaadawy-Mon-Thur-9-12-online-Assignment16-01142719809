import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { successResponse } from "../../utils/success.response";
import userServices from "./user.service";
import { validation } from "../../middleware/validation.middleware";
import * as userValidation from "./user.validation";

const router = Router();

export const routes = {
  base: "/users",
  myProfile: "/profile",
  sendFriendRequest: "/send-friend-request",
  friendRequestReply: "/friend-request-reply/:id",
};

router.get(routes.myProfile, auth, (req, res) => {
  const user = req.user;
  successResponse({
    res,
    data: {
      user,
    },
  });
});

router.post(
  routes.sendFriendRequest,
  validation(userValidation.sendFriendRequestSchema),
  auth,
  async (req, res) => {
    const { to } = req.body as userValidation.sendFriendRequestData;
    const { id: from } = req.user;
    const data = await userServices.sendFriendRequest({ to, from });
    successResponse({
      res,
      message: "Friend request sent successfully",
      data
    });
  },
);

router.patch(
  routes.friendRequestReply,
  validation(userValidation.friendRequestReplySchema),
  auth,
  async (req, res) => {
    const { id } = req.params as {id: string}
    const { status } = req.body
    const { id: userId } = req.user
    await userServices.friendRequestReply({id, status, userId})
    successResponse({
      res,
      message: "Friend request action taken successfully",
    });
  },
);

export default router;
