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
    //   localStorage.setItem('markers', [...state.markers, payload])
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
