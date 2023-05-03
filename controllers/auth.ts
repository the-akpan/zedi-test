import type { NextFunction, Request, Response } from "express";

import { ISignin, ISignup } from "../interfaces/auth";
import { SigninUser, SignupUser } from "../services/auth";

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data: ISignup = req.body;
  const fullName = `${data.firstName} ${data.lastName}`;
  try {
    const user = await SignupUser(fullName, data.email, data.password);
    res.status(201).json({
      message: "Signup successfully",
      data: {
        user: {
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const Signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data: ISignin = req.body;

  try {
    const response = await SigninUser(data.email, data.password);
    res.status(200).json({
      message: "Signin successfully",
      data: response,
    });
  } catch (err: any) {
    next(err);
  }
};
