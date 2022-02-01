import React from 'react'

import { render, fireEvent, screen } from '../../../test_utils'
import App from '../../../App'

const userName = 'testUser'
const token = 'testToken'

beforeAll(() => {
    localStorage.setItem('userName', userName)
    localStorage.setItem('token', token)
})

afterAll(() => {
    localStorage.clear()
})

test('user logout', async () => {
    render(<App />)

    // navHeader 处于登录状态
    expect(await screen.findByText(userName)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '登出' })).toBeInTheDocument()

    // 点击登出
    fireEvent.click(screen.getByRole('button', { name: /登出/i }))
    expect(screen.queryByText(userName)).not.toBeInTheDocument()
    expect(screen.queryByText(/登出/i)).not.toBeInTheDocument()

    // delete token and userName from localStorage
    expect(localStorage.getItem('userName')).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
})
