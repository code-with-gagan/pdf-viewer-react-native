import { configureStore } from '@reduxjs/toolkit'
import menuStateManagement from "./actions-reducers/menuStateManagement"
export const store = configureStore({
    reducer: {
        menuStateManagement
    }
})