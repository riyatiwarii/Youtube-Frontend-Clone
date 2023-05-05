import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
    name : "api",
    initialState: {
        count: 0
    },
    reducers: {
        searchCount: (state) => {
            state.count++
        }
    } 
})

    export const {searchCount} = apiSlice.actions
    export default apiSlice.reducer