import { emptySplitApi } from '../../app/api'
import { Post } from '../../types/Post'

export interface CreatePostReqData {
    title: string
    body: string
    communityId: number
}

interface UpdatePostArgs {
    title?: string
    body?: string
    postId: number
}

export const postApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getPost: build.query<Post, number>({
            query: (id) => `/posts/${id}`,
            transformResponse: (res: { post: Post }) => res.post,
            providesTags: ['POST'],
        }),
        createPost: build.mutation<Post, CreatePostReqData>({
            query: (requestBody) => ({
                url: 'posts',
                method: 'POST',
                body: requestBody,
            }),
            invalidatesTags: ['POST_LIST'],
            transformResponse: (response: { post: Post }) => response.post,
        }),
        updatePost: build.mutation<Post, UpdatePostArgs>({
            query: (args) => ({
                url: `posts/${args.postId}`,
                method: 'PATCH',
                body: { title: args.title, body: args.body },
            }),
            invalidatesTags: ['POST', 'POST_LIST'],
            transformResponse: (response: { post: Post }) => response.post,
        }),
    }),
})

export const { useGetPostQuery, useCreatePostMutation, useUpdatePostMutation } =
    postApi
