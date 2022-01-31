import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { emptySplitApi } from './api'

import counterReducer from '../features/counter/counterSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
        counter: counterReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptySplitApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
