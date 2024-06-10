import Details from "../../components/Details";
import { useParams } from "react-router-dom";
function DeletePackages() {
  let { id } = useParams();
  return (
    <>
      <Details
        link={`http://localhost:9090/managers/get-package-by-id/${id}`}
        DeleteLink={`http://localhost:9090/managers/delete-package/${id}`}
        role="Allpackages"
      />
    </>
  );
}

export default DeletePackages;
