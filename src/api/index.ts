import axios from "axios";
import {
  IGetAllCustomerResponsePaginated,
  IGetCustomerDetailsByIdResponse,
} from "../types/server";

export const getAllCustomers = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get<IGetAllCustomerResponsePaginated>(
    `https://dummyjson.com/users?page=${pageParam}&limit=10`
  );
  return response.data;
};

export const getCustomerById = async ({ id }: { id: string }) => {
  const response = await axios.get<IGetCustomerDetailsByIdResponse>(
    `https://dummyjson.com/users/${id}`
  );
  return response.data;
};
