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
      if (typeof action.payload === "string") {
        state.selectedLocation =
          state.locationHistory.find(
            (loc) => loc.place_id === action.payload
          ) || null;
      } else {
        state.selectedLocation = action.payload;
      }
    },
    addLocationHistory: (state, action) => {
      if (
        !state.locationHistory.find(
          (loc) => loc.place_id === action.payload.place_id
        )
      ) {
        state.locationHistory.push(action.payload);
      }
    },
    removeLocationHistory: (state, action) => {
      state.locationHistory = state.locationHistory.filter(
        (location) => location.place_id !== action.payload.place_id
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
