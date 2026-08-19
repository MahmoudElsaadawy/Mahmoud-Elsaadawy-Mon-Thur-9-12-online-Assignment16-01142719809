import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { validation } from "../../middleware/validation.middleware";
import { successResponse } from "../../utils/success.response";
import * as commentValidation from "./comment.validation";
import commentServices from "./comment.service";

const router = Router();

export const routes = {
  base: "/comments",
  createComment: "/:postId"
};

router.post(
  routes.createComment,
  auth,
  validation(commentValidation.createCommentValidation),
  async (req, res) => {
    const user = req.user
    const postId = req.params.postId as string
    const { text, attachment } = req.body;
    await commentServices.createComment(postId, user, text, attachment);
    successResponse({
      res,
      message: "Comment created successfully",
    });
  },
);

export default router;
