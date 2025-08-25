import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});
