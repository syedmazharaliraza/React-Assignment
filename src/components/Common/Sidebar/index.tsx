import { useEffect, useRef } from "react";
import { useGetAllCustomerQuery } from "../../../hooks/api/useQuery";
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../utils/cn";

const Sidebar = () => {
  const pageParam = useRef<number>(1);
  const {
    data: customers,
    isLoading: isLoadingCustomers,
    fetchNextPage,
    hasNextPage,
  } = useGetAllCustomerQuery({
    pageParam: pageParam.current,
    customConfig: {
      refetchOnWindowFocus: false,
    },
  });

  const { inView, ref } = useInView();
  const { pathname } = useLocation();

  useEffect(() => {
    if (inView && hasNextPage) {
      pageParam.current += 1;
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <aside className="h-[100vh] w-[300px] overflow-auto">
      {isLoadingCustomers && (
        <p className="py-4 italic text-center">Loading...</p>
      )}
      {customers?.map((customer, idx) => (
        <Link to={`/${customer.id}`} key={`${customer.id}-${idx}`}>
          <div
            className={cn(
              "w-full hover:bg-gray-100 border-b px-4 py-5 border-gray-200 last:border-none flex flex-col cursor-pointer",
              pathname.split("/")[1] === customer.id.toString()
                ? "bg-gray-100"
                : "bg-white"
            )}
          >
            <span className="text-lg font-medium">
              {customer.firstName} {customer.lastName}
            </span>
            <small className="text-gray-500">@{customer.username}</small>
            <p className="mt-4 text-sm">
              {customer.address.address}, {customer.address.city},{" "}
              {customer.address.state} - {customer.address.postalCode}
            </p>
          </div>
        </Link>
      ))}
      {hasNextPage && (
        <p className="py-4 italic text-center mx-auto" ref={ref}>
          Loading...
        </p>
      )}
    </aside>
  );
};

export default Sidebar;
