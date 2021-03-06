import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer

import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'
import { emptySplitApi } from '../app/api'
import { rtkQueryErrorLogger } from '../app/middleware/queryErrorLog'

const reducer = {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    auth: authReducer,
    post: postReducer,
}

function render(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ui,
    {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        preloadedState,
        store = configureStore({
            reducer,
            preloadedState,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(
                    emptySplitApi.middleware,
                    rtkQueryErrorLogger
                ),
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }: { children: React.ReactNode }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
