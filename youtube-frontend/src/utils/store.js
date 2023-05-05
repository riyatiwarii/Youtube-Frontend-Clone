import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './toggleSlice'
import searchSlice from './searchSlice'
import liveChatSlice from './liveChatSlice'
import apiSlice from './apiSlice'
import commentSlice from './commentSlice'

const store = configureStore({
    reducer: {
        'toggle': toggleSlice,
        'search': searchSlice,
        'livechat': liveChatSlice,
        'api': apiSlice,
        'comment': commentSlice,
    }
})

export default store