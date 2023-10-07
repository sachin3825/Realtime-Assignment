import React from "react";
import { Link } from "react-router-dom";

const EmployeeListItem = ({ employee, onDelete }) => {
  return (
    <li>
      {employee.name} - {employee.jobRole}
      <Link to={`/updateEmployee/${employee.id}`}>Update</Link>
      <button onClick={() => onDelete(employee.id)}>Delete</button>
    </li>
  );
};

export default EmployeeListItem;
