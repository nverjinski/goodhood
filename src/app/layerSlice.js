import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layers: {
    gunCrimeLayer: {
      active: true,
    },
  },
};

export const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    toggleActiveLayer: (state, action) => {
      const layerName = action.payload;
      if (state.layers[layerName]) {
        state.layers[layerName].active = !state.layers[layerName].active;
      }
    },
  },
});

export const { toggleActiveLayer } = layerSlice.actions;

export default layerSlice.reducer;
