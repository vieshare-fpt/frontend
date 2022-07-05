import { createSlice } from "@reduxjs/toolkit"

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        data: {
            open: true
        }
    },  
    reducers: {
        setOpen: (state, data) => {
            state.data.open = data.payload;
        }
    },
})

export const {
    setOpen,
} = drawerSlice.actions
export default drawerSlice.reducer