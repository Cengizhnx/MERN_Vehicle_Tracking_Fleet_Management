import { createSlice } from "@reduxjs/toolkit";

export const modalslice = createSlice({
  name: "modals",
  initialState: {
    modal: false,
  },
  reducers: {
    visibilityChange: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { visibilityChange } = modalslice.actions;

export default modalslice.reducer;
