import type { Request, Response } from "express";

import { APIError } from "../utils/errors";

export const Hello = (req: Request, res: Response): void => {
  res.json({ message: "Hello World" });
};

export const InternalError = (req: Request, res: Response): void => {
  throw new Error("Something went wrong");
};

export const ApiError = (req: Request, res: Response): void => {
  throw new APIError(422, "API Error");
};

export const IsAdmin = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "You are an admin",
  });
};

export const IsAuth = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "You are authenticated",
  });
};
