const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  ADD_EMPLOYEE_API: BASE_URL + "/employee/addEmployee",
  UPDATE_EMPLOYEE_API: BASE_URL + "/employee/updateEmployee/:id",
  DELETE_EMPLOYEE_API: BASE_URL + "/employee/deleteEmployee/:id",
  GET_ALL_EMPLOYEES_API: BASE_URL + "/employee/getAllEmployees",
};
