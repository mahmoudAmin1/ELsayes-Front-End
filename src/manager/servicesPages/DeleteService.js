import Details from "../../components/Details";
import { useParams } from "react-router-dom";
function DeleteService() {
  let { id } = useParams();
  return (
    <>
      <Details
        link={`http://localhost:9090/managers/get-service-by-id/${id}`}
        DeleteLink={`http://localhost:9090/managers/delete-service/${id}`}
        role="service"
      />
    </>
  );
}

export default DeleteService;
