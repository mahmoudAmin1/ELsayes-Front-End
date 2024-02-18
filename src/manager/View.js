import { useParams } from "react-router-dom";
import Table from "../components/Table";
function View() {
  let { name } = useParams();
  let type = <></>;
  // if (name === "Workers") {
  //   type = <h1>workers</h1>;
  // } else if (name === "Services") {
  //   type = <h1>Services</h1>;
  // }
  return (
    <>
      {type}
      <Table link="https://fakestoreapi.com/users" />
    </>
  );
}
export default View;
