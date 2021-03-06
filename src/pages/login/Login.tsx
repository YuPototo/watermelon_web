import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { useLoginMutation } from '../../features/auth/authService'
import { getSearchTerm } from '../../utils/getSearchTerm'

export default function Login() {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    let fromLocation: string
    try {
        fromLocation = getSearchTerm(location.search, 'from')
    } catch (err) {
        fromLocation = '/'
    }

    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const toastId = toast.loading('正在登录...')
        try {
            const data = await login({ userName, password }).unwrap()
            toast.success('登录成功，即将跳转...')
            localStorage.setItem('token', data.token)
            localStorage.setItem('userName', data.user.userName)
            setTimeout(() => {
                history.push(fromLocation)
            }, 1000)
        } catch (err) {
            // console.log(err) // 在 middleware 里处理了
        } finally {
            toast.remove(toastId)
        }
    }

    return (
        <div className="page-container rounded bg-white p-4">
            <h1 className="mb-4 text-lg text-green-600  lg:text-xl">登录</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="inline-block w-16" htmlFor="username">
                        用户名
                    </label>
                    <TextInput
                        id="username"
                        name="username"
                        value={userName}
                        placeholder="输入一个名字"
                        autoFocus
                        disabled={isLoading}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label className="inline-block w-16" htmlFor="password">
                        密码
                    </label>
                    <TextInput
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="输入密码"
                        disabled={isLoading}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    data-testid="submit-btn"
                >
                    登录
                </Button>
            </form>
            <div>
                没有账号？去
                <Link
                    className="link"
                    to={{
                        pathname: '/signup',
                        search: location.search,
                    }}
                >
                    注册
                </Link>
            </div>
        </div>
    )
}
