import { Router } from "express";
import { validation } from "../../middleware/validation.middleware";
import authServices from "./auth.services";
import { loginSchema, confirmEmailSchema, signupSchema } from "./auth.validation";
import { signUpData, loginData, confirmEmailData } from "./auth.validation";
import { successResponse } from "../../utils/success.response";

const router = Router();

const routes = {
  base: "/auth",
  signup: "/signup",
  confirmEmail: "/confirm-email",
  login: "/login",
};

router.post(routes.signup, validation(signupSchema), async (req, res) => {
  const signupData = req.body as signUpData;
  const data = await authServices.signup(signupData);
  successResponse({
    res,
    message: "User created successfully",
    data: data,
  });
});

router.patch(routes.confirmEmail, validation(confirmEmailSchema), async (req, res) => {
  const confirmEmailData = req.body as confirmEmailData;
  const data = await authServices.confirmEmail(confirmEmailData);
  successResponse({
    res,
    message: "Email confirmed successfully",
    data: data,
  });
})

router.post(routes.login, validation(loginSchema), async (req, res) => {
  const loginData = req.body as loginData;
  const data = await authServices.login(loginData);
      successResponse({
      res,
      message: "Logged in successfully",
      data: data,
    });
  })


export default router;
