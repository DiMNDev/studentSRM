import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";
import style from "../styles/list.module.css";
import TogglePassword from "./password";

const Record = (props) => {
  return (
    <tr className={style.row}>
      <td>{props.record.firstName}</td>
      <td>{props.record.lastName}</td>
      <td>{props.record.email}</td>
      <td>{props.record.age}</td>
      <td>{props.record.currentCollege}</td>
      <td className={style.modifyContainer}>
        <Link
          className={style.actionLink}
          to={`/students/edit/${props.record._id}`}
        >
          Edit
        </Link>
        <TogglePassword
          record={props.record._id}
          deleteRecord={props.deleteRecord}
        />
      </td>
    </tr>
  );
};

export default function RecordList() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
  useEffect(() => {
    setLoading(true);
    async function getRecords() {
      const response = await fetch(
        `https://intro-to-node.onrender.com/students`
      );
      setLoading(false);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records.allStudents);
    }

    getRecords();
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id, pin) {
    const request = { pin: pin };
    const response = await fetch(
      `https://intro-to-node.onrender.com/students/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(request),
      }
    );
    //Error Handling
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    //Log Status
    const status = await response.text();
    console.log(status);
    if (status !== "Invalid pin, deletion failed") {
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
    }
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record record={record} deleteRecord={deleteRecord} key={record._id} />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="container">
      <h3 className="contact-title">Contact List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Current College</th>
            <th>Modify Student</th>
          </tr>
        </thead>
        <tbody>{loading ? <Loader /> : recordList()}</tbody>
      </table>
    </div>
  );
}
