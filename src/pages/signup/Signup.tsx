import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSignupMutation } from '../../features/auth/authService'

export default function Signup() {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const [signup, { isLoading: isCreating, error }] = useSignupMutation()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            await signup({ userName, password }).unwrap()
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {error && <div>{JSON.stringify(error)}</div>}
            {isCreating && <div>正在创建用户...</div>}
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
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <button type="submit">创建账号</button>
            </form>
        </div>
    )
}
