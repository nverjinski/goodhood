import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import layerReducer from "./layerSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    layer: layerReducer,
  },
});
