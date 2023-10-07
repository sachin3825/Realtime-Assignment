import React from "react";
import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployeeAction } from "../../services/operations/employeeAPI";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./topbar.module.css";

const Topbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  // Check if employees is defined
  const employee = employees ? employees.find((e) => e.id === id) : null;

  function getPageName(pathname) {
    if (pathname === "/") {
      return "Employee List";
    } else if (pathname === "/updateEmployee") {
      return "Update Employee Details";
    } else if (pathname === "/addEmployee") {
      return "Add Employee Details ";
    }
  }

  const currentPageName = getPageName(pathname);

  const handleDeleteEmployee = () => {
    dispatch(deleteEmployeeAction(id));
    navigate("/");
  };

  return (
    <nav>
      <div className={styles.navbar}>
        <span>{currentPageName}</span>
        {pathname === "/updateEmployee" && employee && (
          <span className='delete-icon' onClick={handleDeleteEmployee}>
            <FaTrash />
          </span>
        )}
      </div>
    </nav>
  );
};

export default Topbar;
