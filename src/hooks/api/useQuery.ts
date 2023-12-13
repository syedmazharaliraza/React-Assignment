import { UseInfiniteQueryOptions, useInfiniteQuery } from "react-query";
import {
  IErrorResponse,
  IGetAllCustomerResponsePaginated,
} from "../../types/server";
import { getAllCustomers } from "../../api";

const queryKeys = {
  getAllCustomers: ["getAllCustomers"],
  getCustomerDetailsById: (id: string) => ["getCustomerDetailsById", id],
};

export const useGetAllCustomerQuery = ({
  pageParam,
  customConfig,
}: {
  pageParam: number;
  customConfig?: UseInfiniteQueryOptions<
    IGetAllCustomerResponsePaginated,
    IErrorResponse
  >;
}) => {
  const getAllCustomersQuery = useInfiniteQuery({
    queryKey: queryKeys.getAllCustomers,
    queryFn: ({ pageParam = 1 }) => getAllCustomers({ pageParam }),
    getNextPageParam: ({ limit, total }) =>
      limit !== total ? pageParam + 1 : undefined,
    ...customConfig,
  });

  return {
    ...getAllCustomersQuery,
    data: getAllCustomersQuery.data?.pages.map((page) => page.users).flat(),
  };
};
