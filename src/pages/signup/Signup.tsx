import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import toast from 'react-hot-toast'

import { useSignupMutation } from '../../features/auth/authService'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

export default function Signup() {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const [signup, { isLoading }] = useSignupMutation()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const toastId = toast.loading('正在创建用户...')
        try {
            const data = await signup({ userName, password }).unwrap()
            toast.success(`欢迎，${userName}`)
            localStorage.setItem('token', data.token)
            localStorage.setItem('userName', data.user.userName)
            history.push('/')
        } catch (err) {
            // console.log(err) // 在 middleware 里处理了
        } finally {
            toast.remove(toastId) // 如果使用 toast.dismiss()，RTL 会出问题
        }
    }

    return (
        <div>
            <h1 className="mb-4 text-lg text-gray-700 lg:text-xl">创建账号</h1>
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
                <Button type="submit" disabled={isLoading}>
                    创建账号
                </Button>
            </form>
        </div>
    )
}
