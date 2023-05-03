export interface IPagination {
  limit: number;
  page: number;
}

export interface ICreateStartup {
  name: string;
  description: string;
  price: number;
  quantity: number;
}
