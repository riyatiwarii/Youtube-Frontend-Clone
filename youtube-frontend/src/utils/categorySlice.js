import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice(
    {
        name: "category",
        initialState: {
            categoryStatus: false,
            categoryId: 0
        },
        reducers: {
            categoryMode: (state, action) => {
                state.categoryStatus = action.payload
            },
            categoryIdStatus: (state, action) => {
                state.categoryId = action.payload
            }
        }
    }
)

export const {categoryMode, categoryIdStatus} = categorySlice.actions
export default categorySlice.reducer