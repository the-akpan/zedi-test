import { IStartup, Startup } from "../models";
import { paginateLabels } from "../utils/utils";

export const PaginateStartups = async (page: number, limit: number) => {
  const start = (page - 1) * limit;
  const response = await Startup.paginate(
    {},
    {
      offset: start,
      limit,
      customLabels: paginateLabels,
      select: "name description price boughtByIds quantity units createdAt",
    }
  );
  return response;
};

export const CreateStartup = async (
  name: string,
  description: string,
  price: number,
  quantity: number
) => {
  const startup = await Startup.create({
    name,
    description,
    price,
    quantity,
  });
  return parseStartup(startup);
};

export const BuyStartup = 0;

const parseStartup = (startup: IStartup) => {
  const { _id, name, description, price, quantity } = startup;
  return {
    id: _id,
    name,
    description,
    price,
    quantity,
  };
};

export const GetStartupByUserId = async (
  userId: string,
  page: number,
  limit: number
) => {
  const start = (page - 1) * limit;
  const startups = await Startup.paginate(
    { boughtByIds: { $in: [userId] } },
    { offset: start, limit, customLabels: paginateLabels }
  );
  return startups;
};
