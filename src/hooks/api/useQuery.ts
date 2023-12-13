import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import {
  IErrorResponse,
  IGetAllCustomerResponsePaginated,
  IGetCustomerDetailsByIdResponse,
} from "../../types/server";
import { getAllCustomers, getCustomerById } from "../../api";

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
  const getAllCustomersQuery = useInfiniteQuery<
    IGetAllCustomerResponsePaginated,
    IErrorResponse
  >({
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

export const useGetCustomerDetailsById = ({
  id,
  customConfig,
}: {
  id: string;
  customConfig?: UseQueryOptions<
    IGetCustomerDetailsByIdResponse,
    IErrorResponse
  >;
}) => {
  const getCustomerDetailsByIdQuery = useQuery<
    IGetCustomerDetailsByIdResponse,
    IErrorResponse
  >({
    queryKey: queryKeys.getCustomerDetailsById(id),
    queryFn: () => getCustomerById({ id }),
    ...customConfig,
  });

  return getCustomerDetailsByIdQuery;
};
