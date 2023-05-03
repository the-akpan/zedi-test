import type { NextFunction, Request, Response } from "express";

import { ICreateStartup, IPagination } from "../interfaces/startup";
import { CreateStartup, PaginateStartups } from "../services/startup";

export const GetStartups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { limit, page }: IPagination = req.body;

  try {
    const result = await PaginateStartups(page, limit);
    return res.status(200).json({
      message: "Startups fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const RegisterStartup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, quantity }: ICreateStartup = req.body;
    console.log("hello");
    const result = await CreateStartup(name, description, price, quantity);
    console.log("result", result);
    res.status(201).json({
      message: "Startup registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BuyStartup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
