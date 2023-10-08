import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmployeeAction,
  deleteEmployeeAction,
} from "../services/operations/employeeAPI";
import Form from "../components/common/Form";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../components/common/Topbar";

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.data);

  const employee = employees.find((e) => e._id === id);

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
      dispatch(deleteEmployeeAction(id));
      navigate("/employeeList");
    }
  };

  return (
    <div
      style={{
        height: "90%",
      }}
    >
      <Topbar id={id} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Form onSubmit={handleUpdateEmployee} initialValues={employee} />
      </div>
    </div>
  );
}

export default UpdateEmployee;
