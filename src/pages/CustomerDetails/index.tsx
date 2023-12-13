import { useParams } from "react-router-dom";
import { useGetCustomerDetailsById } from "../../hooks/api/useQuery";
import Gallery from "../../components/CustomerDetails/Gallery";

const CustomerDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetCustomerDetailsById({
    id: id as string,
    customConfig: {
      enabled: !!id,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen gap-4 px-4 py-12 justify-center">
      <section>
        {isLoading ? (
          <h1 className="text-2xl">Loading...</h1>
        ) : data ? (
          <article>
            <h1 className="text-3xl text-center">
              {data.firstName} {data.lastName} Details
            </h1>
            {Object.entries(data).map(
              ([key, value]) =>
                typeof value !== "object" && (
                  <p key={key} className="line-clamp-1 text-gray-900">
                    <strong>{key}: </strong>
                    {value}
                  </p>
                )
            )}
          </article>
        ) : (
          <h1 className="text-2xl">No result found</h1>
        )}
      </section>
      <Gallery />
    </div>
  );
};

export default CustomerDetailsPage;
