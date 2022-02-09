import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import Button from '../../components/Button'
import { selectIsLogin } from '../../features/auth/authSlice'
import {
    useCheckIsMemberQuery,
    useJoinMutation,
    useLeaveMutation,
} from '../../features/communityList/communityService'
import PostList from '../../features/postList/PostList'

export default function Community() {
    const [isMember, setIsMember] = useState(false)
    const location = useLocation()
    const isLogin = useAppSelector(selectIsLogin)

    const { name, id: communityId } = location.state as {
        name: string
        id: number
    }

    const { data: isMemberByServer } = useCheckIsMemberQuery(communityId, {
        skip: !isLogin,
    })

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
        const toastId = toast.loading('正在加入...')
        try {
            await join(communityId).unwrap()
            setIsMember(true)
            toast.success('已加入社区')
        } catch (err) {
            // console.log(err) // 在 middleware 里处理了
        } finally {
            toast.remove(toastId) // 如果使用 toast.dismiss()，RTL 会出问题
        }
    }

    const handleLeave = async () => {
        const toastId = toast.loading('请稍等...')
        try {
            await leave(communityId).unwrap()
            setIsMember(false)
            toast.success('已离开社区')
        } catch (err) {
            // console.log(err) // 在 middleware 里处理了
        } finally {
            toast.remove(toastId) // 如果使用 toast.dismiss()，RTL 会出问题
        }
    }

    return (
        <div>
            <h1>{name}</h1>
            <div>
                {isMember ? (
                    <Button onClick={handleLeave} disabled={isLeaving}>
                        离开
                    </Button>
                ) : (
                    <Button onClick={handleJoin} disabled={isJoining}>
                        加入
                    </Button>
                )}
            </div>
            <PostList isCommunity={true} communityId={communityId} />
        </div>
    )
}
