import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { successResponse } from "../../utils/success.response";
import friendRequestServices from "./friend.service";
import { validation } from "../../middleware/validation.middleware";
import * as friendRequestValidation from "./friend.validation";

const router = Router();

export const routes = {
  base: "/friend-request",
  sendFriendRequest: "/send-friend-request",
  friendRequestReply: "/friend-request-reply/:id",
  listFriendRequests: "/list-friend-requests",
  cancelFriendRequest: "/cancel-friend-request/:id",
};

router.post(
  routes.sendFriendRequest,
  validation(friendRequestValidation.sendFriendRequestSchema),
  auth,
  async (req, res) => {
    const { to } = req.body as friendRequestValidation.sendFriendRequestData;
    const { id: from } = req.user;
    const data = await friendRequestServices.sendFriendRequest({ to, from });
    successResponse({
      res,
      message: "Friend request sent successfully",
      data,
    });
  },
);

router.patch(
  routes.friendRequestReply,
  validation(friendRequestValidation.friendRequestReplySchema),
  auth,
  async (req, res) => {
    const { id } = req.params as { id: string };
    const { status } = req.body;
    const { id: userId } = req.user;
    await friendRequestServices.friendRequestReply({ id, status, userId });
    successResponse({
      res,
      message: "Friend request action taken successfully",
    });
  },
);

router.get(routes.listFriendRequests, auth, async (req, res) => {
  const { id } = req.user;
  const { sent = false } = req.query;
  const data = await friendRequestServices.listFriendRequests(
    id,
    JSON.parse(sent as string),
  );
  successResponse({
    res,
    data,
  });
});

router.patch(
  routes.cancelFriendRequest,
  validation(friendRequestValidation.cancelFriendRequestSchema),
  auth,
  async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params as friendRequestValidation.cancelFriendRequestData;
    const data = await friendRequestServices.cancelFriendRequest({ userId, id });
    successResponse({
      res,
      message: "Friend request canceled successfully",
    });
  },
);

export default router;