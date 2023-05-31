import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import userSlice from "./userSlice";
import modalslice from "./modalSlice";
import routeSlice from "./routeSlice";
import mapSlice from "./mapSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    customers: customerSlice,
    modals: modalslice,
    routes: routeSlice,
    maps: mapSlice,
  },
});
