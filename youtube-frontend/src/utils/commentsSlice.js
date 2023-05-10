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
                state.commentitems.unshift(action.payload)
            },
            addReply: (state, action) => {
                const {parentId, reply} = action.payload
                function handleReply(comments){
                    for (let i = 0; i < comments.length; i++){
                      if (comments[i].id === parentId){
                        comments[i].replies.push(reply)
                      } else if (comments[i].replies.length > 0){
                        handleReply(comments[i].replies)
                      }
                    }
                    return false 
                  }
                  
                handleReply(state.commentitems)
            },
            deleteReply:(state, action) => {
                function handleDelete(comments){
                    for (let i = 0; i < comments.length; i++){
                        if(comments[i].id === action.payload){
                            comments.splice(i, 1)
                        } else if(comments[i].replies.length > 0){
                            handleDelete(comments[i].replies)
                        }
                    }
                    return false
                }
                handleDelete(state.commentitems)
            },
            editReply:(state, action) => {
                const {id, body} = action.payload
                function handleEdit(comments){
                    for(let i=0; i < comments.length; i++){
                        if(comments[i].id === id){
                            comments[i].body = body
                        } else if(comments[i].replies.length > 0){
                            handleEdit(comments[i].replies)
                        }
                    }
                    return false
                }
                handleEdit(state.commentitems)
            }
            
        }
    }
)

export const {addComment, addReply, deleteReply, editReply} = commentsSlice.actions
export default commentsSlice.reducer