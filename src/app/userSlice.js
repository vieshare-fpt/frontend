import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailure: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
        }
    },
})

export const {
    loginStart,
    loginFailure,
    loginSuccess,
} = userSlice.actions
export default userSlice.reducer