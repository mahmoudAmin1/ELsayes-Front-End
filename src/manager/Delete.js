import Details from "../components/Details";
import { useParams } from "react-router-dom";

function Delete() {
  let { id } = useParams();
  return (
    <>
      <Details link={`https://fakestoreapi.com/users/${id}`} />
    </>
  );
}
export default Delete;
