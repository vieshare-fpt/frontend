import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    data: {
      currentPost: null,
    },
  },
  name: "searhValue",
  initialState: {
    data: {
      currentSearchValue: "",
    },
  },
  reducers: {
    setCurrentPost: (state, data) => {
      state.data.currentPost = data;
    },
    setCurrentSearchValue: (state, data) => {
      state.data.currentSearchValue = data;
    },
  },
});

export const { setCurrentPost, setCurrentSearchValue } = postSlice.actions;
export default postSlice.reducer;
