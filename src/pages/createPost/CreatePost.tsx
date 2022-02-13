import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectIsLogin } from '../../features/auth/authSlice'

export default function CreatePost() {
    const isLogin = useAppSelector(selectIsLogin)
    const history = useHistory()

    useEffect(() => {
        if (!isLogin) {
            toast.error('请登录后再发帖')
            setTimeout(() => {
                history.replace('signup?from=createPost')
            }, 1000)
        }
    }, [isLogin])
    return <div>CreatePost</div>
}
