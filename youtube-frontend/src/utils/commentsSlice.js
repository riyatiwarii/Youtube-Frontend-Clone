import { createSlice } from "@reduxjs/toolkit";
import {commentsData} from "../components/Constants/constants"

const commentsSlice = createSlice(
    {
        name: "comments",
        initialState: {
            commentitems : commentsData
        },
        reducers: {
            addComment: (state, action) => {
                state.commentitems.push(action.payload)
            }
        }
    }
)

export const {addComment} = commentsSlice.actions
export default commentsSlice.reducer