import z from "zod";
import { GenderEnum, RoleEnum } from "../user/types/user.types";

export const signupSchema = {
  body: z.strictObject({
    name: z.string(),
    email: z.email(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[-!@#$%^&*(()_])(?=.*[0-9]).{8,}$/),
    phone: z.string(),
    age: z.number(),
    gender: z.union([z.literal(GenderEnum.male), z.literal(GenderEnum.female)]),
    isOnline: z.boolean().optional(),
    isActive: z.boolean().optional(),
    provider: z.number().optional(),
    role: z.union([z.literal(RoleEnum.user), z.literal(RoleEnum.admin)]),
    bio: z.string().optional(),
  }),
};

export const loginSchema = {
  body: z.strictObject({
    email: z.email(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[-!@#$%^&*(()_])(?=.*[0-9]).{8,}$/),
  }),
};

export const confirmEmailSchema = {
  body: z.strictObject({
    email: z.email(),
    otp: z.string().min(6).max(6),
  }),
};

export const resendOtpSchema = {
  body: z.strictObject({
    email: z.email(),
  }),
};

export type signUpData = z.infer<typeof signupSchema.body>;
export type loginData = z.infer<typeof loginSchema.body>;
export type confirmEmailData = z.infer<typeof confirmEmailSchema.body>;
export type resendOtpData = z.infer<typeof resendOtpSchema.body>