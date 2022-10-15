import { createSlice } from '@reduxjs/toolkit';

const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    markers: [],
    marker: null,
  },
  reducers: {
    setMarker(state, { payload }) {
      state.markers.push(payload);
    },
    getMarker(state, { payload }) {
      state.marker = payload;
    },
  },
});

export const { setMarker, getMarker } = markerSlice.actions;

export default markerSlice.reducer;
