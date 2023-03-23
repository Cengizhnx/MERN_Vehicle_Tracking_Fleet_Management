import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
