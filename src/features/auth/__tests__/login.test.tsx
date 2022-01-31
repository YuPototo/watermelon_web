import React from 'react'

import { render, fireEvent, screen } from '../../../test_utils'
import App from '../../../App'

test('user login', async () => {
    render(<App />)

    // 显示“注册”按钮和“登录”按钮
    expect(screen.getByText(/注册/i)).toBeInTheDocument()
    expect(screen.getByText(/登录/i)).toBeInTheDocument()

    // 点击“登录”按钮后，进入 login 页面
    fireEvent.click(screen.getByRole('button', { name: /登录/i }))
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toBe('登录')
})
