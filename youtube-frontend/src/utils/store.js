import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './toggleSlice'
import searchSlice from './searchSlice'
import liveChatSlice from './liveChatSlice'
import dataSlice from './dataSlice'
import countSlice from './countSlice'
import commentsSlice from './commentsSlice'
import categorySlice from './categorySlice'

const store = configureStore({
    reducer: {
        'toggle': toggleSlice,
        'search': searchSlice,
        'livechat': liveChatSlice,
        'API_DATA': dataSlice,
        'countSlice': countSlice,
        'comments': commentsSlice,
        "category": categorySlice
    }
})

export default store