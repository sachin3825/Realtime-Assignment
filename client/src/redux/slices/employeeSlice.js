import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.data = action.payload;
    },

    updateEmployee: (state, action) => {
      state.data = state.data.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    },
    deleteEmployee: (state, action) => {
      state.data = state.data.filter(
        (employee) => employee.id !== action.payload.id
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, setLoading } =
  employeeSlice.actions;
export default employeeSlice.reducer;
