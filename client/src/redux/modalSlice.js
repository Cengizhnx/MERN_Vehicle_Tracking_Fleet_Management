import { createSlice } from "@reduxjs/toolkit";

export const modalslice = createSlice({
  name: "modals",
  initialState: {
    modal: false,
    routeModal: false,
  },
  reducers: {
    visibilityChange: (state, action) => {
      state.modal = action.payload;
    },
    visibilityChangeRouteModal: (state, action) => {
      state.routeModal = action.payload;
    },
  },
});

export const { visibilityChange, visibilityChangeRouteModal } =
  modalslice.actions;

export default modalslice.reducer;
