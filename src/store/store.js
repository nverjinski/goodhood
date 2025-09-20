import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import layerReducer from "./layerSlice";
import locationReducer from "./locationSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    location: locationReducer,
    layer: layerReducer,
  },
});
