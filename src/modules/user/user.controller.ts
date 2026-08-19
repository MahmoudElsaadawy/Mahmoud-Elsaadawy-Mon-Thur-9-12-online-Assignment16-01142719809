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
  listFriends: "/list-friends",
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

router.get(routes.listFriends, auth, async (req, res) => {
  const userId = req.user.id;
  const data = await userServices.listFriends(userId);
  successResponse({
    res,
    data,
  });
});

export default router;
