import mongoose, {
  model,
  Schema,
  Types,
  type Document,
  Decimal128,
} from "mongoose";
import paginate from "mongoose-paginate-v2";

import { IUser } from "./user";

export interface IStartup extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  boughtByIds: Types.ObjectId[];
  boughtBy?: IUser[];
  units?: number;
}

const StartupSchema = new Schema<IStartup>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number },
    boughtByIds: { type: [Types.ObjectId], default: [], ref: "User" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

StartupSchema.virtual("units").get(function () {
  return this.quantity - this.boughtByIds.length;
});

StartupSchema.plugin(paginate);

export const Startup = model<IStartup, mongoose.PaginateModel<IStartup>>(
  "Startup",
  StartupSchema
);
