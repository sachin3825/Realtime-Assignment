import { toast } from "react-hot-toast";
import {
  setLoading,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setEmployees,
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
      const response = await apiConnector("POST", ADD_EMPLOYEE_API, {
        name,
        jobRole,
        startDate,
        endDate,
      });

      dispatch(addEmployee(response.data));

      toast.success("Employee added successfully");

      navigate("/");
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export const updateEmployeeAction = (
  id,
  name,
  jobRole,
  startDate,
  endDate,
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Updating employee...");
    try {
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

      dispatch(updateEmployee(response.data));

      toast.success("Employee updated successfully");

      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee");
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const deleteEmployeeAction = (id, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting employee...");
    try {
      await apiConnector("delete", DELETE_EMPLOYEE_API.replace(":id", id));

      dispatch(deleteEmployee(id));

      toast.success("Employee deleted successfully");

      navigate("/");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const getAllEmployeesAction = () => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading employees...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_EMPLOYEES_API);

      dispatch(setEmployees(response.data.employees));

      toast.success("Employees loaded successfully");
    } catch (error) {
      console.error("Error loading employees:", error);
      toast.error("Failed to load employees");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};
