import { configureStore } from '@reduxjs/toolkit'
import urlsReducer from './features/urls/urlsSlice'

export const store = configureStore({
  reducer: {
    urls: urlsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
