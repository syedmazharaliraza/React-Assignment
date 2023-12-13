import { useEffect } from "react";
import { useGetAllCustomerQuery } from "../../../hooks/api/useQuery";
import { useInView } from "react-intersection-observer";

const Sidebar = () => {
  const {
    data: customers,
    isLoading: isLoadingCustomers,
    fetchNextPage,
    hasNextPage,
  } = useGetAllCustomerQuery({});
  const { inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  console.log({ customers });

  return (
    <aside>
      {isLoadingCustomers && <div>Loading...</div>}
      {customers?.map((customer) => (
        <div key={customer.id}>{customer.firstName}</div>
      ))}
    </aside>
  );
};

export default Sidebar;
