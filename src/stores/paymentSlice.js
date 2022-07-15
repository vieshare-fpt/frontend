import { createSlice } from "@reduxjs/toolkit"; 


const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payment: {
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        setPaymentSuccess: (state, action) => {
            state.payment.isFetching = true;
        },
        setPaymentFailed: (state, action) => {
            state.payment.isFetching = false;
        },
        
    },
})

export const {
    setPaymentSuccess,
    setPaymentFailed,
} = paymentSlice.actions;

export default paymentSlice.reducer;