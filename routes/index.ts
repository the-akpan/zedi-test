import { Router } from "express";

import testRouter from "./test";
import authRouter from "./auth";
import startupRouter from "./startup";
import userRouter from "./user";

const router = Router();

router.use("/test", testRouter);
router.use("/auth", authRouter);
router.use("/startups", startupRouter);
router.use("/user", userRouter);

export default router;
