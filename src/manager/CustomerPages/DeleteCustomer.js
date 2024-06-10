import Details from "../../components/Details";
import { useParams } from "react-router-dom";
function DeleteCustomer() {
  let { id } = useParams();
  return (
    <>
      <Details
        link={`http://localhost:9090/managers/get-customer-by-id/${id}`}
        DeleteLink={`http://localhost:9090/managers/delete-customer/${id}`}
        role="customers"
      />
    </>
  );
}

export default DeleteCustomer;
