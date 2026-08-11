import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { validation } from "../../middleware/validation.middleware";
import { successResponse } from "../../utils/success.response";
import authServices from "./auth.service";
import * as authValidation from "./auth.validation";

const router = Router();

export const routes = {
  base: "/auth",
  signup: "/signup",
  confirmEmail: "/confirm-email",
  login: "/login",
  resendEmailOtp: "/resend-email-otp",
  profile: "/profile"
};

router.post(routes.signup, validation(authValidation.signupSchema), async (req, res) => {
  const signupData = req.body as authValidation.signUpData;
  const data = await authServices.signup(signupData);
  successResponse({
    res,
    message: "User created successfully",
    data,
  });
});

router.patch(routes.confirmEmail, validation(authValidation.confirmEmailSchema), async (req, res) => {
  const confirmEmailData = req.body as authValidation.confirmEmailData;
  const data = await authServices.confirmEmail(confirmEmailData);
  successResponse({
    res,
    message: "Email confirmed successfully",
    data,
  });
})

router.post(routes.login, validation(authValidation.loginSchema), async (req, res) => {
  const loginData = req.body as authValidation.loginData;
  const data = await authServices.login(loginData);
      successResponse({
      res,
      message: "Logged in successfully",
      data,
    });
  })

router.patch(routes.resendEmailOtp, validation(authValidation.resendOtpSchema), async(req, res)=> {
  const resendData = req.body as authValidation.resendOtpData;
  const data = await authServices.resendOtp(resendData);
      successResponse({
      res,
      message: "Otp sent successfully",
      data,
    });
})

router.get(routes.profile, auth, (req, res)=> {
  const user = req.user
  successResponse({
      res,
      data: {
        user
      },
    });
})

export default router;
