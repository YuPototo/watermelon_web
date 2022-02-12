import { emptySplitApi } from '../../app/api'
import { Post } from '../../types/Post'

interface PostListRes {
    posts: Post[]
    hasNext: boolean
    hasPrev: boolean
}

interface PostListArgs {
    before?: number
    after?: number
}

interface CommunityPostListArgs {
    communityId: number
    before?: number
    after?: number
}

export const postListApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getNewPostsByAll: build.query<PostListRes, PostListArgs>({
            query: (args) => {
                let query = ''
                if (args?.before) {
                    query = `?before=${args.before}`
                }
                if (args?.after) {
                    query = `?after=${args.after}`
                }
                return '/posts/all/new' + query
            },
        }),
        getNewPostsByUser: build.query<PostListRes, PostListArgs>({
            query: (args) => {
                let query = ''
                if (args?.before) {
                    query = `?before=${args.before}`
                }
                if (args?.after) {
                    query = `?after=${args.after}`
                }
                return '/posts/me/new' + query
            },
            providesTags: ['POST_LIST'],
        }),
        getNewPostsByCommunity: build.query<PostListRes, CommunityPostListArgs>(
            {
                query: (args) => {
                    let query = ''
                    if (args?.before) {
                        query = `?before=${args.before}`
                    }
                    if (args?.after) {
                        query = `?after=${args.after}`
                    }
                    return `/posts/community/${args.communityId}/new` + query
                },
            }
        ),
    }),
})

export const {
    useGetNewPostsByAllQuery,
    useGetNewPostsByUserQuery,
    useGetNewPostsByCommunityQuery,
} = postListApi
