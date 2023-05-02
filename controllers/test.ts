import type { Request, Response } from "express";

import APIError from "../utils/errors";

export const Hello = (req: Request, res: Response): void => {
  res.json({ message: "Hello World" });
};

export const InternalError = (req: Request, res: Response): void => {
  throw new Error("Something went wrong");
};

export const ApiError = (req: Request, res: Response): void => {
  throw new APIError(422, "API Error");
};
