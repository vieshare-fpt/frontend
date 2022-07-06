import { createSlice } from '@reduxjs/toolkit';

const packageSlice = createSlice({
    name: 'package',
    initialState: {
        packages: {
            data: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getPackages: (state, action) => {
            state.packages.data = action.payload;
        }
    }
})

export const  {
    getPackages
} = packageSlice.actions;

export default packageSlice.reducer