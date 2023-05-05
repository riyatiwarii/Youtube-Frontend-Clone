import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState: [],
    reducers: {
        addCommentList : (state, action) => {
            state = action.payload
        },
        resetCommentList: (state) => {
            state = []
        }
    }
})

export const {addCommentList, resetCommentList} = commentSlice.actions

export default commentSlice.reducer