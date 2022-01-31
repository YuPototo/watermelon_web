import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout, selectIsLogin } from '../auth/authSlice'

export default function Header() {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(selectIsLogin)
    const userName = useAppSelector((state) => state.auth.userName)

    return (
        <div>
            {isLogin ? (
                <>
                    <span>{userName}</span>
                    <button onClick={() => dispatch(logout())}>登出</button>
                </>
            ) : (
                <>
                    <button onClick={() => history.push('/login')}>登录</button>
                    <button onClick={() => history.push('/signup')}>
                        注册
                    </button>
                </>
            )}
        </div>
    )
}
