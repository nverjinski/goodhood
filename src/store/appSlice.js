import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    loginModal: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleModalOpen: (state, action) => {
      const modalName = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = !state.modals[modalName];
      }
    },
  },
});

export const { toggleModalOpen } = appSlice.actions;

export default appSlice.reducer;
