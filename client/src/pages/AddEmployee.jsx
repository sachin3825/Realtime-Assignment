import React from "react";
import { useDispatch } from "react-redux";
import { addEmployeeAction } from "../services/operations/employeeAPI";
import Form from "../components/common/Form";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddEmployee = (formData) => {
    dispatch(
      addEmployeeAction(
        formData.name,
        formData.jobRole,
        formData.startDate,
        formData.endDate,
        navigate
      )
    );
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <Form
        onSubmit={handleAddEmployee}
        initialValues={{ name: "", jobRole: "", startDate: "", endDate: "" }}
      />
    </div>
  );
}

export default AddEmployee;
