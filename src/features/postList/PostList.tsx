import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Post } from '../../types/Post'
import { selectIsLogin } from '../auth/authSlice'
import Pager from './Pager'
import {
    useGetNewPostsByAllQuery,
    useGetNewPostsByCommunityQuery,
    useGetNewPostsByUserQuery,
} from './PostListService'
import Posts from './Posts'
import RankMethodPicker from './RankMethodPicker'

export type RankMethod = 'new' | 'all'

type PostListType = 'allNew' | 'userNew' | 'communityNew'

const getPostListType = (
    isLogin: boolean,
    rankMethod: RankMethod,
    isCommunity?: boolean
): PostListType => {
    if (isCommunity) return 'communityNew'

    if (!isLogin) return 'allNew'

    if (rankMethod === 'new') return 'userNew'

    if (rankMethod === 'all') return 'allNew'

    throw Error('没有正确的 postListType')
}

const showAllButton = (isLogin: boolean, isCommunity: boolean) => {
    if (isCommunity) {
        return false
    } else {
        if (isLogin) return true
        return false
    }
}

interface PageParam {
    before?: number
    after?: number
}

type Props = {
    className?: string
    isCommunity?: boolean
    communityId?: number
}

export default function PostList({
    communityId,
    className = '',
    isCommunity = false,
}: Props) {
    const [rankMethod, setRankMethod] = useState<RankMethod>('new')
    const [pageParam, setPageParam] = useState<PageParam>({})

    const [changePage, setChangePage] = useState(0)

    const [hasNext, setHasNext] = useState<boolean>(false)
    const [hasPrev, setHasPrev] = useState<boolean>(false)
    const [posts, setPosts] = useState<Post[]>([])

    const isLogin = useAppSelector(selectIsLogin)

    const postListType = getPostListType(isLogin, rankMethod, isCommunity)

    const { data: allNewRes, isFetching: allNewFetching } =
        useGetNewPostsByAllQuery(pageParam, {
            skip: postListType !== 'allNew',
        })

    const { data: userNewRes, isFetching: userNewFetching } =
        useGetNewPostsByUserQuery(pageParam, {
            skip: postListType !== 'userNew',
        })

    const communityQueryArg = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        communityId: communityId!, // tech debts
        before: pageParam.before,
        after: pageParam.after,
    }
    const { data: communityNewRes, isFetching: communityNewFetching } =
        useGetNewPostsByCommunityQuery(communityQueryArg, {
            skip: postListType !== 'communityNew',
        })

    useEffect(() => {
        if (postListType === 'userNew') {
            if (userNewRes) {
                setPosts(userNewRes.posts)
                setHasNext(userNewRes.hasNext)
                setHasPrev(userNewRes.hasPrev)
            }
        } else if (postListType === 'allNew') {
            if (allNewRes) {
                setPosts(allNewRes.posts)
                setHasNext(allNewRes.hasNext)
                setHasPrev(allNewRes.hasPrev)
            }
        } else if (postListType === 'communityNew') {
            if (communityNewRes) {
                setPosts(communityNewRes.posts)
                setHasNext(communityNewRes.hasNext)
                setHasPrev(communityNewRes.hasPrev)
            }
        }
    }, [
        postListType,
        allNewFetching,
        userNewFetching,
        communityNewFetching,
        changePage, // hack: force side effect
    ])

    const isFetching = allNewFetching || userNewFetching || communityNewFetching

    const handleClickNext = () => {
        const lastPost = posts[posts.length - 1]
        setPageParam({ after: lastPost.id })
        setChangePage(changePage + 1)
        window.scrollTo(0, 0)
    }

    const handleClickPrev = () => {
        const firstPost = posts[0]
        setPageParam({ before: firstPost.id })
        setChangePage(changePage + 1)
        window.scrollTo(0, 0)
    }

    return (
        <div data-testid="post_list" className={className}>
            <RankMethodPicker
                rankMethod={rankMethod}
                pickRankMethod={(picked) => setRankMethod(picked)}
                showAll={showAllButton(isLogin, isCommunity)}
            />
            {isFetching && (
                <div className="my-4 rounded bg-white py-2 px-4">加载中...</div>
            )}
            {posts && (
                <>
                    <Posts posts={posts} showCommunity={!isCommunity} />
                    {posts.length === 0 && (
                        <NoPostHint postListType={postListType} />
                    )}
                    <Pager
                        hasNext={hasNext}
                        hasPrev={hasPrev}
                        onClickNext={handleClickNext}
                        onClickPrev={handleClickPrev}
                    />
                </>
            )}
        </div>
    )
}

type NoPostHintProps = {
    postListType: PostListType
}

const HINT_TEXT = {
    allNew: '如果你看到这条信息，说明出 Bug 了',
    userNew: '你还没有加入社区，请加入一个社区吧',
    communityNew: '这个社区还没有帖子，发布一个吧',
}

function NoPostHint({ postListType }: NoPostHintProps) {
    const hint = HINT_TEXT[postListType]
    return <div className="mt-2 rounded bg-white p-3">{hint}</div>
}
