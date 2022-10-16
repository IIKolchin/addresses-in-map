import { createSlice } from '@reduxjs/toolkit';
import { URL } from '../utils/constants';

export const initialState = {
  loading: false,
  hasErrors: false,
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getData: (state) => {
      state.loading = true;
    },
    getDataSuccess: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getDataFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getData, getDataSuccess, getDataFailure } = dataSlice.actions;

export default dataSlice.reducer;

export function fetchData() {
  return async (dispatch) => {
    dispatch(getData());

    try {
      const response = await fetch(URL);
      const data = await response.json();

      dispatch(getDataSuccess(data));
    } catch (error) {
      dispatch(getDataFailure());
    }
  };
}
