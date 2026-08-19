import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { validation } from "../../middleware/validation.middleware";
import { successResponse } from "../../utils/success.response";
import * as postValidation from "./post.validation";
import postServices from "./post.service";

const router = Router();

export const routes = {
  base: "/posts",
  createPost: "/",
  getPosts: "/userid/:id",
  homePosts: "/home"
};

router.post(routes.createPost, auth, validation(postValidation.createPostValidation), async (req, res) => {
  const userId = req.user.id;
  const { content, title, privacy } = req.body
  const data = await postServices.createPost({ content, title, privacy, userId});
  successResponse({
    res,
    data,
  });
});

router.get(routes.getPosts, auth, validation(postValidation.getPostsByUserIdValidation), async (req, res) => {
  const id = req.params.id as string
  const user = req.user
  const data = await postServices.getPostsByUserId(id, user);
  successResponse({
    res,
    data,
  });
});

router.get(routes.homePosts, auth, async (req, res) => {
  const user = req.user
  const data = await postServices.getHomePagePosts(user);
  successResponse({
    res,
    data,
  });
});


export default router;
