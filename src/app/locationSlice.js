import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: null,
  locationHistory: [],
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    addLocationHistory: (state, action) => {
      state.locationHistory.push(action.payload);
    },
    removeLocationHistory: (state, action) => {
      state.locationHistory = state.locationHistory.filter(
        (location) => location.id !== action.payload.id
      );
    },
  },
});

export const {
  setSelectedLocation,
  addLocationHistory,
  removeLocationHistory,
} = locationSlice.actions;

export default locationSlice.reducer;
