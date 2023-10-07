import { toast } from "react-hot-toast";
import {
  setLoading,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../redux/slices/employeeSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  UPDATE_EMPLOYEE_API,
  ADD_EMPLOYEE_API,
  DELETE_EMPLOYEE_API,
  GET_ALL_EMPLOYEES_API,
} = endpoints;

export function addEmployeeAction(name, jobRole, startDate, endDate, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Adding employee...");
    dispatch(setLoading(true));

    try {
      // Make the API call to add an employee
      const response = await apiConnector("POST", ADD_EMPLOYEE_API, {
        name,
        jobRole,
        startDate,
        endDate,
      });
      console.log(ADD_EMPLOYEE_API);

      // Dispatch the action to add the employee to the Redux store
      dispatch(addEmployee(response.data));

      // Display a success toast
      toast.success("Employee added successfully");

      // Navigate back to the home page
      navigate("/");
    } catch (error) {
      // Handle errors and display an error toast
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function updateEmployeeAction(
  id,
  name,
  jobRole,
  startDate,
  endDate,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating employee...");
    dispatch(setLoading(true));

    try {
      // Make the API call to update an employee
      const response = await apiConnector(
        "put",
        UPDATE_EMPLOYEE_API.replace(":id", id),
        {
          name,
          jobRole,
          startDate,
          endDate,
        }
      );

      // Dispatch the action to update the employee in the Redux store
      dispatch(updateEmployee(response.data));

      // Display a success toast
      toast.success("Employee updated successfully");

      // Navigate back to the home page
      navigate("/");
    } catch (error) {
      // Handle errors and display an error toast
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function deleteEmployeeAction(id) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting employee...");
    dispatch(setLoading(true));

    try {
      // Make the API call to delete an employee
      await apiConnector("delete", DELETE_EMPLOYEE_API.replace(":id", id));

      // Dispatch the action to delete the employee from the Redux store
      dispatch(deleteEmployee({ id }));

      // Display a success toast
      toast.success("Employee deleted successfully");
    } catch (error) {
      // Handle errors and display an error toast
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export const getAllEmployeesAction = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_EMPLOYEES_API);
    // console.log(response);
    if (!response?.data?.employees) {
      throw new Error("API responded with an error: " + response?.data?.error);
    }
    result = response?.data?.employees;
  } catch (error) {
    console.error("GET_ALL_EMPLOYEES_API API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
