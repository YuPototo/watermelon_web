import { emptySplitApi } from '../../app/api'

export interface User {
    userName: string
    userId: number
}

export interface AuthResponse {
    user: User
    token: string
}

export interface AuthRequest {
    userName: string
    password: string
}

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        signup: build.mutation<AuthResponse, AuthRequest>({
            query: (arg) => ({
                url: 'users',
                method: 'POST',
                body: arg,
            }),
        }),
        login: build.mutation<AuthResponse, AuthRequest>({
            query: (arg) => ({
                url: 'users/login',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
})

export const { useSignupMutation, useLoginMutation } = authApi
