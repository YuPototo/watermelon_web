import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import Button from '../../components/Button'
import { useLoginMutation } from '../../features/auth/authService'

export default function Login() {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const toastId = toast.loading('正在登录...')
        try {
            await login({ userName, password }).unwrap()
            toast.success(`欢迎，${userName}`)
            history.push('/')
        } catch (err) {
            // console.log(err) // 在 middleware 里处理了
        } finally {
            toast.dismiss(toastId)
        }
    }

    return (
        <div>
            <h1>登录</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">用户名</label>
                    <input
                        id="username"
                        name="username"
                        value={userName}
                        placeholder="输入一个名字"
                        autoFocus
                        disabled={isLoading}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">密码</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="输入密码"
                        disabled={isLoading}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    data-testid="submit-btn"
                >
                    登录
                </Button>
            </form>
        </div>
    )
}
