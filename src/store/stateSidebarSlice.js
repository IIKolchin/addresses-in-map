import { createSlice } from '@reduxjs/toolkit';

const stateSidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    showSidebar: false,
  },
  reducers: {
    openSidebar(state, { payload }) {
      state.showSidebar = payload;
    },
  //   closeSidebar(state, { payload }) {
  //     state.showSidebar = payload;
  //   },
  },
});

export const { openSidebar } = stateSidebarSlice.actions;

export default stateSidebarSlice.reducer;
