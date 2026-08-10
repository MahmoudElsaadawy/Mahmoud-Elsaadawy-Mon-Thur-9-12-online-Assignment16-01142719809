import { Router } from "express";
import { validation } from "../../middleware/validation.middleware";
import { loginService, signupService } from "./auth.services";
import { loginSchema, signupSchema } from "./auth.validation";

const router = Router()

router.post("/signup", validation(signupSchema), signupService)
router.post("/login", validation(loginSchema), loginService)


export default router