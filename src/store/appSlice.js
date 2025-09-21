import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    loginModal: false,
  },
  toolbox: {
    expanded: true,
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
    toggleToolboxExpanded: (state) => {
      console.log("hit");
      state.toolbox.expanded = !state.toolbox.expanded;
    },
  },
});

export const { toggleModalOpen, toggleToolboxExpanded } = appSlice.actions;

export default appSlice.reducer;
