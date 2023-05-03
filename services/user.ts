import log from "../config/log";
import { IUser, User } from "../models";
import { ZediError } from "../utils/errors";

export const CreateUser = async (
  fullName: string,
  email: string,
  password: string,
  isAdmin: boolean
) => {
  log.debug("Creating user");
  const user = new User({
    fullName,
    email,
    isAdmin,
  });

  if (!password) {
    throw new Error("Password is required");
  }

  await user.setPassword(password);
  await user.save();

  log.debug("User created");

  return user;
};

export const CreateAdminUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  log.debug("Creating admin user");
  const user = await CreateUser(fullName, email, password, true);

  return user;
};

export const CreateRegularUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  log.debug("Creating regular user");
  const user = await CreateUser(fullName, email, password, false);

  return user;
};

export const GetUser = async (email: string, fields?: string) => {
  if (fields === undefined || fields === "") {
    fields = "fullName email createdAt";
  }
  const user = await User.findOne({ email }).populate(fields);

  if (!user) {
    throw new ZediError("User not found");
  }

  return user;
};

export const parseUser = (user: IUser): Record<string, any> => {
  const { fullName, email, createdAt } = user;

  return {
    fullName,
    email,
    createdAt,
  };
};
