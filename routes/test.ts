import { Router } from "express";

import { methodNotAllowedHandler } from "../middleware/handlers";
import { testController } from "../controllers";

const router = Router();

router.route("/ok").get(testController.Hello).all(methodNotAllowedHandler);

router
  .route("/error")
  .get(testController.InternalError)
  .all(methodNotAllowedHandler);

router
  .route("/api-error")
  .get(testController.ApiError)
  .all(methodNotAllowedHandler);

export default router;
