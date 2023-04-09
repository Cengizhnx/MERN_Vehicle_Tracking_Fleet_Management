import { createSlice } from "@reduxjs/toolkit";

export const routeSlice = createSlice({
  name: "routes",
  initialState: {
    route: false,
  },
  reducers: {
    addRoute: (state, action) => {
      state.route = action.payload;
    },
  },
});

export const { addRoute } = routeSlice.actions;

export default routeSlice.reducer;
