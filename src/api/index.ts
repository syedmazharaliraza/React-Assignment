import axios from "axios";
import { IGetAllCustomerResponsePaginated } from "../types/server";

export const getAllCustomers = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get<IGetAllCustomerResponsePaginated>(
    `https://dummyjson.com/users?page=${pageParam}&limit=10`
  );
  return response.data;
};
