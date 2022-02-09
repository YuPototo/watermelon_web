import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { emptySplitApi } from './api'

import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'
import { rtkQueryErrorLogger } from './middleware/queryErrorLog'

export const store = configureStore({
    reducer: {
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
        auth: authReducer,
        post: postReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            emptySplitApi.middleware,
            rtkQueryErrorLogger
        ),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
