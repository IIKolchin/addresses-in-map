import { configureStore } from '@reduxjs/toolkit';
import addressSlice from './addressSlice';
import dataSlice from './dataSlice';
import formSlice from './formSlice';
import markerSlice from './markerSlice';
import stateButtonAddSlice from './stateButtonAddSlice';
import stateSidebarSlice from './stateSidebarSlice';

export default configureStore({
  reducer: {
    address: addressSlice,
    marker: markerSlice,
    data: dataSlice,
    form: formSlice,
    sidebar: stateSidebarSlice,
    addButton: stateButtonAddSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
