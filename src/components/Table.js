import { useEffect, useState } from "react";
import "../css/Table.css";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
function Table(props) {
  const navigate = useNavigate();
  const users_api = props.link;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(users_api)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  users.forEach(function (v) {
    delete v.address;
    delete v.name;
  });
  const ThData = () => {
    return (
      <>
        {Object.keys(users[0]).map((data) => (
          <th key={data}>{data}</th>
        ))}
        <th key="operations">Operations</th>
      </>
    );
  };
  const tdData = () => {
    return users.map((data) => {
      return (
        <tr key={data.id}>
          {Object.keys(users[0]).map((v) => {
            return <td key={data[v]}>{data[v]}</td>;
          })}
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => navigate(`/Delete/${data.id}`)}
            >
              Delete
            </button>
            {`  |  `}
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate(`/Update/${data.id}`)}
            >
              Update
            </button>
          </td>
        </tr>
      );
    });
  };
  if (users.length === 0) {
    return (
      <Oval
        visible={true}
        height="200"
        width="200"
        color="blue"
        secondaryColor="#2778c4"
        ariaLabel="oval-loading"
        wrapperClass="spinner"
      />
    );
  }
  return (
    <>
      <div id="myTable" className="table-responsive sm-10">
        <table className="table tableHigh">
          <thead className="thead-light">
            <tr>{ThData()}</tr>
          </thead>
          <tbody>{tdData()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
