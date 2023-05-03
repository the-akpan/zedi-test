import type { Request, Response, NextFunction } from "express";
import { AnonymousUser } from "../models";
import { verifyToken } from "../utils/auth";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization?.split(" ")[1] || "";
  const claims = verifyToken(token);
  if (claims === null) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }
  req.user = {
    _id: claims._id,
    isAdmin: claims.isAdmin,
  };

  next();
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user.isAdmin) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
  next();
};

export const useAnonymous = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  req.user = AnonymousUser;
  next();
};
