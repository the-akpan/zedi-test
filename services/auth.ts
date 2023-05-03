import { IUser } from "../models";
import { CreateRegularUser, GetUser, parseUser } from "./user";
import { APIError, ZediError } from "../utils/errors";
import { generateToken } from "../utils/auth";

export const SignupUser = async (
  fullName: string,
  email: string,
  password: string
): Promise<Record<string, any>> => {
  try {
    const user = await CreateRegularUser(fullName, email, password);
    return parseUser(user);
  } catch (err: any) {
    if (err?.code == 11000) {
      throw new APIError(409, "Email already exists");
    }
    throw err;
  }
};

export const SigninUser = async (
  email: string,
  password: string
): Promise<Record<string, any>> => {
  try {
    const user = await GetUser(email, "email isAdmin password");
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      throw new ZediError();
    }

    const token = parseUserToken(user);

    return { user: parseUser(user), token };
  } catch (err: any) {
    if (err instanceof ZediError) {
      throw new APIError(401, "Invalid credentials");
    }
    throw err;
  }
};

const parseUserToken = (user: IUser) => {
  const claims = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };

  return generateToken(claims);
};
