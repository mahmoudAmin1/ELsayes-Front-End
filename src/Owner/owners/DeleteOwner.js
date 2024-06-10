import Details from "../../components/Details";
import { useParams } from "react-router-dom";
function DeleteOwner() {
  let { id } = useParams();
  return (
    <>
      <Details
        link={`http://localhost:9090/owners/get-by-id/${id}`}
        DeleteLink={`http://localhost:9090/owners/delete-owner/${id}`}
        role="owners"
      />
    </>
  );
}

export default DeleteOwner;
