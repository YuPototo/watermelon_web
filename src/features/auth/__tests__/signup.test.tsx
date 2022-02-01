import React from 'react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen } from '../../../test_utils'
import App from '../../../App'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

const userName = 'some_user'

const handlers = [
    rest.post('/users', (req, res, ctx) => {
        const data = { user: { userName }, token: 'testToken' }
        return res(ctx.json(data), ctx.delay(150))
    }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('user registers a new account', async () => {
    render(<App />)

    // 显示“注册”按钮和“登录”按钮
    expect(screen.getByText(/注册/i)).toBeInTheDocument()
    expect(screen.getByText(/登录/i)).toBeInTheDocument()

    // 点击“注册”按钮，进入 signup 页面
    userEvent.click(screen.getByRole('button', { name: /注册/i }))
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toBe('创建账号')

    // 输入用户名、密码，并提交
    const userNameInput = screen.getByLabelText('用户名')
    userEvent.type(userNameInput, userName)

    const passwordInput = screen.getByLabelText('密码')
    userEvent.type(passwordInput, 'some_password')

    userEvent.click(screen.getByRole('button', { name: '创建账号' }))

    // 创建时：出现 loading
    expect(await screen.findByText(/正在创建用户/i)).toBeInTheDocument()

    // 成功创建后：loading 提示会消失
    // * react-hot-toast 的 bug：在 jsDOM 里无法正常 dismiss
    // await waitForElementToBeRemoved(() => screen.queryByText(/正在创建用户/i))

    // after success response: show success toast
    expect(await screen.findByText(`欢迎，${userName}`)).toBeInTheDocument()

    // after success response: header should change
    expect(
        screen.queryByRole('button', { name: /注册/i })
    ).not.toBeInTheDocument()
    expect(
        screen.queryByRole('button', { name: /登录/i })
    ).not.toBeInTheDocument()
    expect(screen.getByText(userName)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /登出/i })).toBeInTheDocument()

    // 返回首页（这个 story 之后要修改）
    expect(await screen.findByText(/this is home page/i)).toBeInTheDocument()
})

test('server respond error', async () => {
    server.use(
        rest.post('/users', (req, res, ctx) => {
            return res(
                ctx.status(409),
                ctx.json({ message: '该用户名已被注册' })
            )
        })
    )

    render(<App />)

    // 点击“注册”按钮，进入 signup 页面
    userEvent.click(screen.getByRole('button', { name: /注册/i }))

    // 输入用户名、密码，并提交
    const userNameInput = screen.getByLabelText('用户名')
    userEvent.type(userNameInput, userName)

    const passwordInput = screen.getByLabelText('密码')
    userEvent.type(passwordInput, 'some_password')

    userEvent.click(screen.getByRole('button', { name: '创建账号' }))

    // 出现错误信息
    expect(await screen.findByText(/该用户名已被注册/i)).toBeInTheDocument()
})
