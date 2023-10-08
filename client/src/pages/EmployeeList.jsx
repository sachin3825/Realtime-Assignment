import React, { useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllEmployeesAction,
  deleteEmployeeAction,
} from "../services/operations/employeeAPI";
import styles from "./Employee.module.css";
import noEmployee from "../assets/noEmployee.png";
import EmployeeListItem from "../components/cors/EmployeeListItems";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.data);
  const loading = useSelector((state) => state.employee.loading);
  console.log(employees);

  const refreshEmployeeList = () => {
    dispatch(getAllEmployeesAction());
  };

  useEffect(() => {
    refreshEmployeeList();
  }, [dispatch]);

  const currentEmployees = employees.filter((employee) => !employee.endDate);
  const previousEmployees = employees.filter((employee) => employee.endDate);

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await dispatch(deleteEmployeeAction(id, navigate));
        refreshEmployeeList();
        navigate("/");
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles["list-Container"]}>
        <Link to='/addEmployee' className={styles["Add-button"]}>
          <IoIosAddCircle color='#1da1f2' />
        </Link>
        {loading ? (
          <div>Loading...</div>
        ) : employees.length !== 0 ? (
          <>
            <section className={styles["Employeelist-current"]}>
              <h3 className={styles.Employeelist}>Current Employees</h3>
              <ul>
                {currentEmployees.map((employee) => (
                  <EmployeeListItem
                    key={employee._id}
                    employee={employee}
                    onDelete={() => handleDeleteEmployee(employee._id)}
                  />
                ))}
              </ul>
            </section>

            <section>
              <h3>Previous Employees</h3>
              <ul>
                {previousEmployees.map((employee) => (
                  <EmployeeListItem
                    key={employee._id}
                    employee={employee}
                    onDelete={() => handleDeleteEmployee(employee._id)}
                  />
                ))}
              </ul>
            </section>
          </>
        ) : (
          <div className={styles.image}>
            <img src={noEmployee} alt='No Employee available' />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
