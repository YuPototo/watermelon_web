import { emptySplitApi } from '../../app/api'

import { Comment } from '../../types/Comment'

interface AddCommentArg {
    postId: number
    body: string
}

interface UpdateCommentArg {
    commentId: number
    body: string
}

export const commentApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getComments: build.query<Comment[], number>({
            query: (postId) => `/posts/${postId}/comments`,
            transformResponse: (res: { comments: Comment[] }) => res.comments,
            providesTags: ['COMMENT_TREE'],
        }),
        addComment: build.mutation<Comment, AddCommentArg>({
            query: (body) => ({
                url: 'comments',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['COMMENT_TREE'],
        }),
        updateComment: build.mutation<Comment, UpdateCommentArg>({
            query: ({ commentId, body }) => ({
                url: `comments/${commentId}`,
                method: 'PATCH',
                body: { body },
            }),
            invalidatesTags: ['COMMENT_TREE'],
        }),
    }),
})

export const {
    useGetCommentsQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
} = commentApi
