import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: {
            currentCategory: null
        }
    },  
    reducers: {
        setCurrentCategory: (state, data) => {
            state.data.currentCategory = data.payload;
        }
    },
})

export const {
    setCurrentCategory,
} = categorySlice.actions
export default categorySlice.reducer