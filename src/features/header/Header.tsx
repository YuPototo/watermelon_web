import React from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout, selectIsLogin } from '../auth/authSlice'
import Button from '../../components/Button'

function Brand() {
    const iconImage = '/watermelon.png'

    return (
        <Link to="/" className="flex items-center">
            <img className="mr-2" src={iconImage} alt="brand" />
            <span>好西瓜</span>
        </Link>
    )
}

function AuthArea(props: { className?: string }) {
    const { className } = props
    const history = useHistory()
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(selectIsLogin)
    const userName = useAppSelector((state) => state.auth.userName)

    return (
        <div className={clsx('flex items-center gap-2', className)}>
            {isLogin ? (
                <>
                    <span>{userName}</span>
                    <button onClick={() => dispatch(logout())}>登出</button>
                </>
            ) : (
                <>
                    <Button
                        color="green"
                        outline
                        onClick={() => history.push('/login')}
                    >
                        登录
                    </Button>
                    <Button
                        color="green"
                        onClick={() => history.push('/signup')}
                    >
                        注册
                    </Button>
                </>
            )}
        </div>
    )
}

export default function Header() {
    return (
        <div className="flex bg-gray-200 px-4 py-2">
            <Brand />
            <AuthArea className="ml-auto" />
        </div>
    )
}
