import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
    name: 'wallet',
    initialState : {
        wallet : null
    },
    reducers: {
        setWallet: (state, action) => {
            state.wallet = action.payload;
        }
    }
})
export const {
    setWallet
} = walletSlice.actions;

export default walletSlice.reducer