import { model, Schema, Types, type Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;

  // instance methods
  checkPassword: (password: string) => Promise<boolean>;
  setPassword: (password: string) => Promise<void>;
}

const userSchema: Schema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.method(
  "checkPassword",
  async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
);

userSchema.method(
  "setPassword",
  async function (password: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  }
);

export const User = model<IUser>("User", userSchema);

export interface IReqUser {
  _id: Types.ObjectId;
  isAdmin: boolean;
}

export const AnonymousUser: IReqUser = {
  _id: new Types.ObjectId("000000000000000000000000"),
  isAdmin: false,
};
