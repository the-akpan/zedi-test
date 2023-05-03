import { matchedData, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = {};
    errors.array().forEach((err) => {
      // @ts-ignore
      extractedErrors[err.path] = err.msg;
    });
    res.status(400).json({
      message: "Bad request",
      error: extractedErrors,
    });
    return;
  }

  req.body = matchedData(req, { includeOptionals: true });
  next();
};
