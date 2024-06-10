import Details from "../../components/Details";
import { useParams } from "react-router-dom";
function DeleteManager() {
  let { id } = useParams();
  return (
    <>
      <Details
        link={`http://localhost:9090/owners/get-manager-by-id/${id}`}
        // DeleteLink={`http://localhost:9090/owners/delete-branch/${id}`}
        role="managers"
      />
    </>
  );
}

export default DeleteManager;
