import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmployeeListItem.module.css";

import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";

const formatDate = (date, isStartDate) => {
  if (!date) {
    return " - Present";
  }

  const formattedDate = new Date(date);

  const options = { day: "numeric", month: "short", year: "numeric" };
  return isStartDate
    ? `From ${formattedDate.toLocaleDateString("en-US", options)}`
    : formattedDate.toLocaleDateString("en-US", options);
};

const EmployeeListItem = ({ employee, onDelete }) => {
  const formattedStartDate = formatDate(employee.startDate, true);
  const formattedEndDate = formatDate(employee.endDate, false);

  return (
    <li className={styles.employee}>
      <div>
        <p className={styles.name}>{employee.name}</p>
        <p className={styles.job}>{employee.jobRole}</p>
        <p className={styles.date}>
          {formattedStartDate}
          {employee.endDate ? ` to ${formattedEndDate}` : " - Present"}
        </p>
      </div>
      <div className={styles.buttons}>
        <Link
          to={`/updateEmployee/${employee._id}`}
          className={styles.updateButton}
        >
          <GrUpdate />
        </Link>
        <button
          onClick={() => onDelete(employee._id)}
          className={styles.deleteButton}
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </li>
  );
};

export default EmployeeListItem;
