import type { Request, Response, NextFunction } from "express";
import { GetStartupByUserId } from "../services/startup";
import { IPagination } from "../interfaces/startup";

export const GetBoughtUnits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit }: IPagination = req.body;
    const result = await GetStartupByUserId(
      req.user._id.toString("hex"),
      page,
      limit
    );
    res.status(200).json({
      message: "Startups fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
