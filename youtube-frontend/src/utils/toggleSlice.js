import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        isSidebarOpen : true
    },
    reducers: {
        toggleSidebar : (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        closeSidebar: (state) => {
            state.isSidebarOpen = false
        }
    }
})

export const {toggleSidebar, closeSidebar} = toggleSlice.actions
export default toggleSlice.reducer
