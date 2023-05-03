import { Router } from "express";

import { authController } from "../controllers";
import { methodNotAllowedHandler } from "../middleware/handlers";
import { checkEmail, checkName, checkPassword } from "../utils/validators";
import { validateRequest } from "../middleware/validators";
import { body, check } from "express-validator";

const router = Router();

router
  .route("/signin")
  .post(
    [checkEmail(check("email")), body("password").exists(), validateRequest],
    authController.Signin
  )
  .all(methodNotAllowedHandler);

router
  .route("/signup")
  .post(
    [
      checkEmail(check("email")),
      checkPassword(body("password")),
      checkName(body("firstName")),
      checkName(body("lastName")),
      validateRequest,
    ],
    authController.Signup
  )
  .all(methodNotAllowedHandler);

router.route("/logout");

export default router;
