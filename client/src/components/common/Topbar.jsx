import React from "react";
import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployeeAction } from "../../services/operations/employeeAPI";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./topbar.module.css";

const Topbar = ({ id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();

  console.log(useParams());

  console.log(id);
  function getPageName(pathname) {
    if (pathname === "/") {
      return "Employee List";
    } else if (pathname === "/addEmployee") {
      return "Add Employee Details";
    } else {
      return "Update Employee Details";
    }
  }

  const currentPageName = getPageName(pathname);

  const showDeleteIcon = pathname !== "/" && pathname !== "/addEmployee";

  const handleDeleteEmployee = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployeeAction(id, navigate));
      navigate("/");
    }
  };

  return (
    <nav>
      <div className={styles.navbar}>
        <span>{currentPageName}</span>
        {showDeleteIcon && (
          <span className='delete-icon' onClick={handleDeleteEmployee}>
            <FaTrash />
          </span>
        )}
      </div>
    </nav>
  );
};

export default Topbar;
