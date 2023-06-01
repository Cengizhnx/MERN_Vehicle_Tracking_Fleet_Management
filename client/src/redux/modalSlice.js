import { createSlice } from "@reduxjs/toolkit";

export const modalslice = createSlice({
  name: "modals",
  initialState: {
    modal: false,
    routeModal: false,
    mapModal: false,
  },
  reducers: {
    visibilityChange: (state, action) => {
      state.modal = action.payload;
    },
    visibilityChangeRouteModal: (state, action) => {
      state.routeModal = action.payload;
    },
    visibilityChangeMapModal: (state, action) => {
      state.mapModal = action.payload;
    },
  },
});

export const {
  visibilityChange,
  visibilityChangeRouteModal,
  visibilityChangeMapModal,
} = modalslice.actions;

export default modalslice.reducer;
