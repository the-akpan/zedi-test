import { Router } from "express";
import { query } from "express-validator";

import { userController } from "../controllers";
import { isAuthenticated } from "../middleware/auth";
import { methodNotAllowedHandler } from "../middleware/handlers";
import { validateRequest } from "../middleware/validators";
import { checkNumber } from "../utils/validators";

const router = Router();

router
  .route("/bought")
  .get(
    [
      isAuthenticated,
      checkNumber(query("page"), 1),
      checkNumber(query("limit"), 20),
      validateRequest,
    ],
    userController.GetBoughtUnits
  )
  .all(methodNotAllowedHandler);

export default router;
