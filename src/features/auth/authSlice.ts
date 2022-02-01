import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authApi } from './authService'
import type { RootState, AppThunk } from '../../app/store'

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
        setToken: (state, { payload }: PayloadAction<string | null>) => {
            state.token = payload
        },
        setUserName: (state, { payload }: PayloadAction<string | null>) => {
            state.userName = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.signup.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token
                    state.userName = payload.user.userName
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token
                    state.userName = payload.user.userName
                }
            )
    },
})

export const { setToken, setUserName } = authSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.auth.token !== null && state.auth.userName !== null
}

/* thunks */
export const getLocalUserInfo = (): AppThunk => async (dispatch) => {
    const token = localStorage.getItem('token')
    const userName = localStorage.getItem('userName')
    if (token && userName) {
        dispatch(setToken(token))
        dispatch(setUserName(userName))
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUserName(null))
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
}

export default authSlice.reducer
