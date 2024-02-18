import { useEffect, useState } from "react";
import "../css/Table.css";
function Table(props) {
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
    return Object.keys(users[0]).map((data) => {
      return <th key={data}>{data}</th>;
    });
  };

  const tdData = () => {
    return users.map((data) => {
      return (
        <tr key={data.id}>
          {Object.keys(users[0]).map((v) => {
            return <td key={data[v]}>{data[v]}</td>;
          })}
        </tr>
      );
    });
  };
  if (users.length === 0) {
    return <h1> loading </h1>;
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
