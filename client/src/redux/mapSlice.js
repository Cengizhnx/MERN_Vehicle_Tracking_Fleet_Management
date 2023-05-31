import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "maps",
  initialState: {
    map: false,
    mapName: false,
  },
  reducers: {
    addMap: (state, action) => {
      state.map = action.payload;
    },
    addMapNames: (state, action) => {
      state.mapName = action.payload;
    },
  },
});

export const { addMap, addMapNames } = mapSlice.actions;

export default mapSlice.reducer;
