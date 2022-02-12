import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'

export const emptySplitApi = createApi({
    reducerPath: 'api',
    tagTypes: ['POST_LIST', 'COMMUNITY_MEMBER'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL || '',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: () => ({}),
})
