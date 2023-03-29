import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customer: [],
  },
  reducers: {
    allCustomers: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { allCustomers } = customerSlice.actions;

export default customerSlice.reducer;
