import { isValidObjectId } from "mongoose";
import z from "zod"

export const createPostValidation = {
  body: z.strictObject({
    title: z.string(),
    content: z.string(),
    privacy: z.union([
      z.literal(0),
      z.literal(1),
      z.literal(2),
    ]).optional()
  })
}

export const getPostsByUserIdValidation = {
  params: z.strictObject({
    id: z.string().refine(
      (value) => {
        return isValidObjectId(value);
      },
      { error: "Invalid id value" },
    ),
  })
}

export type createPostData = z.infer<typeof createPostValidation.body>