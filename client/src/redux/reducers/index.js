import { combineReducers } from "@reduxjs/toolkit";
import employeeSlice from "../slices/employeeSlice";

const rootReducer = combineReducers({
  employee: employeeSlice,
});
export default rootReducer;
