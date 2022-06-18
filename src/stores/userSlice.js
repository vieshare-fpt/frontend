import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            userInfo: null,
            isFetching:false,
            error: false,
        },
        currentUserInfoLimit: {
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
        getUserInfoFalse: (state) => {
            state.currentUser.isFetching = false;
            state.currentUser.error = true;
        },
        
        getUserInfoLimitStart: (state) => {
            state.currentUserInfoLimit.isFetching = true;
        },
        getUserInfoLimitSuccess: (state, action) => {
            state.currentUserInfoLimit.isFetching = false;
            state.currentUserInfoLimit.userInfo = action.payload;

        },
        getUserInfoLimitFalse: (state) => {
            state.currentUserInfoLimit.isFetching = false;
            state.currentUserInfoLimit.error = true;
        },
        
    }
})

export const {
    getUserInfoStart,
    getUserInfoSuccess,
    getUserInfoFalse,
    getUserInfoLimitStart,
    getUserInfoLimitSuccess,
    getUserInfoLimitFalse,
} = userSlice.actions;

export default userSlice.reducer