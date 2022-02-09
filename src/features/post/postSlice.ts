import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../types/Post'

export interface PostState {
    post: Post | null
}

const initialState: PostState = {
    post: null,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: (state, { payload }: PayloadAction<Post>) => {
            state.post = payload
        },
    },
})

export const { setPost } = postSlice.actions

export default postSlice.reducer
