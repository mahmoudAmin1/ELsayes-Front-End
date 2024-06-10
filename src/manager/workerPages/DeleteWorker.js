import Details from "../../components/Details";
import { useParams } from "react-router-dom";
function DeleteWorker() {
  let { id } = useParams();
  return (
    <>
      <Details
        link={`http://localhost:9090/managers/get-worker-by-id/${id}`}
        DeleteLink={`http://localhost:9090/managers/delete-worker/${id}`}
        role="worker"
      />
    </>
  );
}

export default DeleteWorker;
