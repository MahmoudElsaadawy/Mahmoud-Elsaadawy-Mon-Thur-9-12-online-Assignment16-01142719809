import z from "zod"
import { GenderEnum, RoleEnum } from "../../DB/models/user/user.types"

export const signupSchema = {
  body: z.strictObject({
    name: z.string(),
    email: z.email(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[-!@#$%^&*(()_])(?=.*[0-9]).{8,}$/),
    phone: z.string(),
    age: z.number(),
    gender: z.union([
      z.literal(GenderEnum.male),
      z.literal(GenderEnum.female),
    ]),
    isOnline: z.boolean().optional(),
    isActive: z.boolean().optional(),
    provider: z.number().optional(),
    role: z.union([
      z.literal(RoleEnum.user),
      z.literal(RoleEnum.admin),
    ]),
    bio: z.string().optional()
  })
}

export const loginSchema = {
  body: z.strictObject({
    email: z.email(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[-!@#$%^&*(()_])(?=.*[0-9]).{8,}$/),
  })
}

export type signUpData = z.infer<typeof signupSchema.body>