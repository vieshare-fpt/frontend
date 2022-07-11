import { createSlice } from '@reduxjs/toolkit';

const packageSlice = createSlice({
    name: 'package',
    initialState: {
        packages: {
            data: null,
            isFetching: false,
            error: false
        },
        payment: {
            package: null
        }
    },
    reducers: {
        setPackages: (state, action) => {
            state.packages.data = action.payload;
        },
        setPackagePayment: (state, action) => {
            state.payment.package = action.payload;
        }
    }
})

export const  {
    setPackages, setPackagePayment
} = packageSlice.actions;

export default packageSlice.reducer