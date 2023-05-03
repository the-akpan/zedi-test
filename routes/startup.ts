import { Router } from "express";
import { body, query } from "express-validator";

import { startupController } from "../controllers";
import { isAdmin, isAuthenticated } from "../middleware/auth";
import { methodNotAllowedHandler } from "../middleware/handlers";
import { validateRequest } from "../middleware/validators";
import {
  checkNumber,
  checkRequiredNumber,
  checkValidName,
} from "../utils/validators";

const router = Router();

router
  .route("/")
  .get(
    [
      isAuthenticated,
      checkNumber(query("page"), 1),
      checkNumber(query("limit"), 20),
      validateRequest,
    ],
    startupController.GetStartups
  )
  .post(
    [
      isAuthenticated,
      isAdmin,
      checkRequiredNumber(body("price")),
      checkRequiredNumber(body("quantity")),
      checkValidName(body("name")),
      checkValidName(body("description")),
      validateRequest,
    ],
    startupController.RegisterStartup
  )
  .all(methodNotAllowedHandler);

export default router;
