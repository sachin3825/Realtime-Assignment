import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  getAllEmployeesAction,
  deleteEmployeeAction,
} from "../services/operations/employeeAPI";
import styles from "./Employee.module.css";
import noEmployee from "../assets/noEmployee.png";
import EmployeeListItem from "../components/cors/EmployeeListItems";
import { toast } from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeeData = await getAllEmployeesAction();
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const currentEmployees = employees.filter((employee) => !employee.endDate);
  const previousEmployees = employees.filter((employee) => employee.endDate);

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployeeAction(id);
        toast.success("Employee deleted successfully");

        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee");
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
            <section>
              <h2>Current Employees</h2>
              <ul>
                {currentEmployees.map((employee) => (
                  <EmployeeListItem
                    key={employee.id}
                    employee={employee}
                    onDelete={handleDeleteEmployee}
                  />
                ))}
              </ul>
            </section>

            <section>
              <h2>Previous Employees</h2>
              <ul>
                {previousEmployees.map((employee) => (
                  <EmployeeListItem
                    key={employee.id}
                    employee={employee}
                    onDelete={handleDeleteEmployee}
                  />
                ))}
              </ul>
            </section>
          </>
        ) : (
          <div>
            <img src={noEmployee} alt='No Employee available' />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
