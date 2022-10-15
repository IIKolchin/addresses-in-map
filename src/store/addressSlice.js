import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: '',
    },
    reducers: {
        setPosition(state, { payload }) {
            state.address = payload
        }

    },
});

export const {setPosition} = addressSlice.actions;

export default addressSlice.reducer;