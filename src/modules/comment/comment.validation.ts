import { isValidObjectId } from "mongoose";
import z from "zod";

export const createCommentValidation = {
  params: z.strictObject({
    postId: z.string().refine(
      (value) => {
        return isValidObjectId(value);
      },
      { error: "Invalid id value" },
    ),
  }),
  body: z
    .strictObject({
      text: z.string().optional(),
      attachment: z.string().optional(),
    })
    .refine((data) => Boolean(data.text || data.attachment), {
      error: "text or attachment must be provided",
    }),
};

export type createCommentData = z.infer<typeof createCommentValidation.body> &
  z.infer<typeof createCommentValidation.params>;
