import { createSlice } from '@reduxjs/toolkit';
import { IMarker } from '../services/types';

const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    markers: [] as IMarker[],
    marker: null,
  },
  reducers: {
    setMarker(state, { payload }) {
      state.markers.push(payload);
    },
    getMarker(state, { payload }) {
      state.marker = payload;
    },
    setArrMarker(state, { payload }) {
      state.markers = payload;
    },
  },
});

export const { setMarker, getMarker, setArrMarker } = markerSlice.actions;

export default markerSlice.reducer;
