import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: 'post',
    initialState: {
        data: {
            currentPost: null
        }
    },  
    reducers: {
        setCurrentPost: (state, data) => {
            state.data.currentPost = data;
        }
    },
})

export const {
    setCurrentPost,
} = postSlice.actions
export default postSlice.reducer