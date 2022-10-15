import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: {
    title: '',
    description: '',
  },
  forms: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm(state, { payload }) {
      state.form = { ...state.form, ...payload };
    },
    addForm(state, { payload }) {
      state.forms.push(payload);
    },
  },
});

export const { setForm, addForm } = formSlice.actions;

export default formSlice.reducer;
