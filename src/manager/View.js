import { useParams } from "react-router-dom";
import Table from "../components/Table";
function View() {
  let { name } = useParams();
  return (
    <>
      <Table link="https://fakestoreapi.com/users" />
    </>
  );
}
export default View;
