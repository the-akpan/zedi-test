import { Router } from "express";

import { methodNotAllowedHandler } from "../middleware/handlers";
import { testController } from "../controllers";
import { isAdmin, isAuthenticated } from "../middleware/auth";

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

router
  .route("/is-admin")
  .get([isAuthenticated, isAdmin], testController.IsAdmin)
  .all(methodNotAllowedHandler);

router
  .route("/is-auth")
  .get([isAuthenticated], testController.IsAuth)
  .all(methodNotAllowedHandler);

export default router;
