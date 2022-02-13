import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import Button from '../../components/Button'
import { selectIsLogin } from '../../features/auth/authSlice'
import {
    useCheckIsMemberQuery,
    useGetCommunityInfoQuery,
    useJoinMutation,
    useLeaveMutation,
} from '../../features/communityList/communityService'
import PostList from '../../features/postList/PostList'

export default function Community() {
    const [isMember, setIsMember] = useState(false)
    const [name, setName] = useState('')

    const location = useLocation()
    const history = useHistory()
    const { communityId } = useParams<{ communityId: string }>()

    const isLogin = useAppSelector(selectIsLogin)

    useEffect(() => {
        if (location.state) {
            const name = (location.state as { name: string }).name
            setName(name)
        }
    }, [location.state])

    const { data: communityInfo } = useGetCommunityInfoQuery(
        parseInt(communityId),
        { skip: location.state !== undefined }
    )

    useEffect(() => {
        if (communityInfo) setName(communityInfo.name)
    }, [communityInfo])

    const { data: isMemberByServer } = useCheckIsMemberQuery(
        parseInt(communityId),
        {
            skip: !isLogin,
        }
    )

    useEffect(() => {
        if (!isLogin) {
            setIsMember(false)
        } else {
            if (isMemberByServer) setIsMember(isMemberByServer)
        }
    }, [isMemberByServer, isLogin])

    const [join, { isLoading: isJoining }] = useJoinMutation()
    const [leave, { isLoading: isLeaving }] = useLeaveMutation()

    const handleJoin = async () => {
        if (!isLogin) {
            const toastId = toast('未登录，即将跳转注册页')
            setTimeout(() => {
                history.push({
                    pathname: '/signup',
                    search: `?from=${location.pathname}`,
                })
                toast.remove(toastId)
            }, 1000)
            return
        }

        const toastId = toast.loading('正在加入...')
        try {
            await join(parseInt(communityId)).unwrap()
            setIsMember(true)
            toast.success('已加入社区')
        } catch (err) {
            // console.log(err) // 在 middleware 里处理了
        } finally {
            toast.remove(toastId) // 如果使用 toast.dismiss()，RTL 会出问题
        }
    }

    const handleLeave = async () => {
        if (!isLogin) {
            toast('未登录，即将跳转注册页')
            setTimeout(() => {
                history.push({ pathname: '/signup' })
                toast.remove(toastId)
            }, 1000)
            return
        }

        const toastId = toast.loading('请稍等...')
        try {
            await leave(parseInt(communityId)).unwrap()
            setIsMember(false)
            toast.success('已离开社区')
        } catch (err) {
            // console.log(err) // 在 middleware 里处理了
        } finally {
            toast.remove(toastId) // 如果使用 toast.dismiss()，RTL 会出问题
        }
    }

    return (
        <div className="page-container">
            <div className="rounded bg-white p-4">
                <h1 className="mb-3 mr-4 inline-block text-xl text-gray-700 md:mb-0 md:inline">
                    {name}
                </h1>
                <div className="inline-block">
                    {isMember ? (
                        <Button
                            outline
                            onClick={handleLeave}
                            disabled={isLeaving}
                        >
                            离开
                        </Button>
                    ) : (
                        <Button onClick={handleJoin} disabled={isJoining}>
                            加入
                        </Button>
                    )}
                </div>
            </div>
            <PostList
                className="mt-4"
                isCommunity={true}
                communityId={parseInt(communityId)}
            />
        </div>
    )
}
