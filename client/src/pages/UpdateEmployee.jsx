import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmployeeAction,
  deleteEmployeeAction,
} from "../services/operations/employeeAPI";
import Form from "../components/common/Form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  const employee = employees.find((e) => e._id === id); // Use _id or appropriate key

  if (!employee) {
    return <div>Loading...</div>;
  }

  const handleUpdateEmployee = (formData) => {
    dispatch(
      updateEmployeeAction(
        id,
        formData.name,
        formData.jobRole,
        formData.startDate,
        formData.endDate,
        navigate
      )
    );
  };

  const handleDeleteEmployee = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployeeAction(id))
        .then(() => {
          toast.success("Employee deleted successfully");
          navigate("/employeeList");
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          toast.error("Failed to delete employee");
        });
    }
  };

  return (
    <div>
      <h1>Update Employee</h1>
      <Form onSubmit={handleUpdateEmployee} initialValues={employee} />
      <button onClick={handleDeleteEmployee}>Delete Employee</button>
    </div>
  );
}

export default UpdateEmployee;
