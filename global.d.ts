import { IReqUser } from "./models";

declare module "express-serve-static-core" {
  interface Request {
    user: IReqUser;
  }
}
