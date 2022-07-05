import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUserInfoFull: {
      userInfo: null,
      isFetching: false,
      error: false,
    },
    clearInfo: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    setUserInfoSuccess: (state, action) => {
      state.currentUserInfoFull.userInfo = action.payload;
    },
    setUserInfoFailed: (state) => {
      state.currentUserInfoFull.isFetching = false;
      state.currentUserInfoFull.error = true;
    },
    clearInfoStart: (state) => {
      state.clearInfo.isFetching = true;
    },
    clearInfoSuccess: (state) => {
      state.clearInfo.isFetching = false;
      state.currentUserInfoFull.userInfo = null;
      state.clearInfo.error = false;
    },
    clearInfoFailed: (state) => {
      state.clearInfo.isFetching = false;
      state.clearInfo.error = true;
    },
  },
});

export const {
  setUserInfoFailed,
  setUserInfoSuccess,
  clearInfoSuccess,
  clearInfoFailed,
  clearInfoStart,
} = userSlice.actions;

export default userSlice.reducer;
