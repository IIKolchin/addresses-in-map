import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import addressSlice from './addressSlice';
import dataSlice from './dataSlice';
import formSlice from './formSlice';
import markerSlice from './markerSlice';
import stateButtonAddSlice from './stateButtonAddSlice';
import stateSidebarSlice from './stateSidebarSlice';

const store = configureStore({
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

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;


export type RootState = ReturnType<typeof store.getState>

export default store