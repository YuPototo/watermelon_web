import { emptySplitApi } from '../../app/api'
import { Post } from '../../types/Post'

export const postApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getPost: build.query<Post, number>({
            query: (id) => `/posts/${id}`,
            transformResponse: (res: { post: Post }) => res.post,
        }),
    }),
})

export const { useGetPostQuery } = postApi
