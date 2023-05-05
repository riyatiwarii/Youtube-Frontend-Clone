import { createSlice } from "@reduxjs/toolkit";

const liveChatSlice = createSlice({
    name : "livechat",
    initialState: [],
    reducers: {
        addChat: (state, action) => {
            state.unshift(action.payload)
            state.splice(20, 1)
        }
    }
})

export const {addChat} = liveChatSlice.actions
export default liveChatSlice.reducer