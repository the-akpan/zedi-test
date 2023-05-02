import type { NextFunction, Request, Response } from "express";

import APIError from "../utils/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof APIError) {
    res.status(err.code).json({ message: err.message });
  } else if (err instanceof Error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ message: "Not found" });
};

export const methodNotAllowedHandler = (req: Request, res: Response): void => {
  res.status(405).json({ message: "Method not allowed" });
};
