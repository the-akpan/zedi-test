import jwt from "jsonwebtoken";
import log from "../config/log";

export const generateToken = (
  claims: Record<string, any>,
  expiry: number | string = "7d"
): string => {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const config: jwt.SignOptions = {
    expiresIn: expiry,
  };

  const token = jwt.sign(claims, secretKey, config);

  return token;
};

export const verifyToken = (token: string): Record<string, any> | null => {
  try {
    const secretKey: any = process.env.JWT_SECRET_KEY as string;
    const claims = jwt.decode(token, secretKey);

    return claims;
  } catch (error) {
    log.warn(error);
    return null;
  }
};
