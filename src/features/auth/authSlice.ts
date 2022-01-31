import { createSlice } from '@reduxjs/toolkit'

import { authApi } from './authService'
import type { RootState } from '../../app/store'

export interface AuthState {
    token: string | null
    userName: string | null
}

const initialState: AuthState = {
    token: null,
    userName: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            state.userName = null
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.signup.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
                state.userName = payload.user.userName
            }
        )
    },
})

export const { logout } = authSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.auth.token !== null && state.auth.userName !== null
}

export default authSlice.reducer
