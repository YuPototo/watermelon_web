import { emptySplitApi } from '../../app/api'

type CommunityId = number

interface Community {
    id: number
    name: string
}

interface GetCommunitiesRes {
    communities: Community[]
}

interface CheckIsMemberRes {
    isMember: boolean
}

export const communityApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getCommunities: build.query<Community[], void>({
            query: () => '/communities',
            transformResponse: (res: GetCommunitiesRes) => res.communities,
        }),
        getCommunityInfo: build.query<Community, number>({
            query: (id) => `/communities/${id}`,
            transformResponse: (res: { community: Community }) => res.community,
        }),
        checkIsMember: build.query<boolean, CommunityId>({
            query: (id: CommunityId) => `/communityUser/${id}`,
            transformResponse: (res: CheckIsMemberRes) => res.isMember,
            providesTags: ['COMMUNITY_MEMBER'],
        }),
        join: build.mutation<void, CommunityId>({
            query: (id: CommunityId) => ({
                url: `/communityUser/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['POST_LIST', 'COMMUNITY_MEMBER'],
        }),
        leave: build.mutation<void, CommunityId>({
            query: (id: CommunityId) => ({
                url: `/communityUser/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['POST_LIST', 'COMMUNITY_MEMBER'],
        }),
    }),
})

export const {
    useGetCommunitiesQuery,
    useGetCommunityInfoQuery,
    useCheckIsMemberQuery,
    useJoinMutation,
    useLeaveMutation,
} = communityApi
