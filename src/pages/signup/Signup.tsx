import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import toast from 'react-hot-toast'

import { useSignupMutation } from '../../features/auth/authService'
import Button from '../../components/Button'

export default function Signup() {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const [signup, { isLoading }] = useSignupMutation()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const toastId = toast.loading('正在创建用户...')
        try {
            await signup({ userName, password }).unwrap()
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
            <h1>创建账号</h1>
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
                <Button type="submit" disabled={isLoading}>
                    创建账号
                </Button>
            </form>
        </div>
    )
}
