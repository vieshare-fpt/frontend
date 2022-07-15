import { createSlice } from '@reduxjs/toolkit';

const bankSlice = createSlice({
    name: 'bank',
    initialState: {
        banks: []
    },
    reducers: {
        setBanks: (state, action) => {
            console.log("abc",action.payload)
            state.banks = action.payload;
        },
        
    }
})

export const  {
    setBanks
} = bankSlice.actions;

export default bankSlice.reducer