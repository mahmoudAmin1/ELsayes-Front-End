import Details from "../../components/Details";
import { useParams } from "react-router-dom";
function DeleteBranch() {
  let { id } = useParams();
  return (
    <>
      <Details
        link={`http://localhost:9090/owners/get-branch-by-id/${id}`}
        DeleteLink={`http://localhost:9090/owners/delete-branch/${id}`}
        role="branches"
      />
    </>
  );
}

export default DeleteBranch;
