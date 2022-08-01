import { createSlice } from "@reduxjs/toolkit"

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        data: {
            value: 'information'
        }
    },  
    reducers: {
        setTab: (state, data) => {
            state.data.value = data.payload;
        }
    },
})

export const {
    setTab,
} = tabSlice.actions
export default tabSlice.reducer