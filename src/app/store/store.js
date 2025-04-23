import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/authSlice/authSlice'
import dataReducer from '../feature/dataSlice/dataSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
    }
})

export default store

