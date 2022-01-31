import React from 'react'

import { render, fireEvent, screen } from '../../../test_utils'
import App from '../../../App'

test('user logout', async () => {
    const preloadedState = {
        auth: { userName: 'testUser', token: 'testToken' },
    }
    render(<App />, { preloadedState })

    // 显示用户名和登出按钮
    expect(screen.getByText(/登出/i)).toBeInTheDocument()
    expect(screen.getByText(/testUser/i)).toBeInTheDocument()

    // 点击登出
    fireEvent.click(screen.getByRole('button', { name: /登出/i }))
    expect(screen.queryByText(/testUser/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/登出/i)).not.toBeInTheDocument()
})
