import { ENGINE_METHOD_STORE } from 'constants'
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
        checkIsMember: build.query<boolean, CommunityId>({
            query: (id: CommunityId) => `/communityUser/${id}`,
            transformResponse: (res: CheckIsMemberRes) => res.isMember,
        }),
        join: build.mutation<void, CommunityId>({
            query: (id: CommunityId) => ({
                url: `/communityUser/${id}`,
                method: 'PUT',
            }),
        }),
        leave: build.mutation<void, CommunityId>({
            query: (id: CommunityId) => ({
                url: `/communityUser/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetCommunitiesQuery,
    useCheckIsMemberQuery,
    useJoinMutation,
    useLeaveMutation,
} = communityApi
