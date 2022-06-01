import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            userInfo: null,
            isFetching:false,
            error: false,
        }
    },
    reducers: {
        getUserInfoStart: (state) => {
            state.currentUser.isFetching = true;

        },
        getUserInfoSuccess: (state, action) => {
            state.currentUser.isFetching = false;
            state.currentUser.userInfo = action.payload;

        },
        getUserInfoFalse: (state, action) => {
            state.currentUser.isFetching = false;
            state.currentUser.error = true;
        }
    }
})

export const {
    getUserInfoStart,
    getUserInfoSuccess,
    getUserInfoFalse
} = userSlice.actions;

export default userSlice.reducer