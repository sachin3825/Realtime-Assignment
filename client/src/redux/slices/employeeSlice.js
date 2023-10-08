// employeeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.data.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.data.findIndex(
        (employee) => employee._id === action.payload._id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.data = state.data.filter(
        (employee) => employee._id !== action.payload.id
      );
    },
    setEmployees: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setEmployees,
  setLoading,
} = employeeSlice.actions;
export default employeeSlice.reducer;
