import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    customers: customerSlice,
  },
});
