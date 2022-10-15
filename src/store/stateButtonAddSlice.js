import { createSlice } from '@reduxjs/toolkit';

const stateButtonAddSlice = createSlice({
  name: 'addButton',
  initialState: {
    showButton: true,
  },
  reducers: {
    showButtonAdd(state, { payload }) {
      state.showButton = payload;
    },

  },
});

export const { showButtonAdd } = stateButtonAddSlice.actions;

export default stateButtonAddSlice.reducer;
