import React from 'react'

import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '../../../testUtils/testUtils'
import App from '../../../App'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { commonHandlers } from '../../../testUtils/serverHandlers'

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
const token = 'testToken'

const handlers = [
    rest.post('/users/login', (req, res, ctx) => {
        const data = { user: { userName }, token }
        return res(ctx.json(data), ctx.delay(150))
    }),
]

const server = setupServer(...handlers, ...commonHandlers)
beforeAll(() => {
    server.listen()
})

beforeEach(() => {
    localStorage.clear()
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('user logins', async () => {
    render(<App />)

    // 显示“注册”按钮和“登录”按钮
    expect(screen.getByText(/注册/i)).toBeInTheDocument()
    expect(screen.getByText(/登录/i)).toBeInTheDocument()

    // 点击“登录”按钮后，进入 login 页面
    userEvent.click(screen.getByRole('button', { name: /登录/i }))
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toBe('登录')

    // 输入用户名、密码，并提交
    const userNameInput = screen.getByLabelText('用户名')
    userEvent.type(userNameInput, userName)

    const passwordInput = screen.getByLabelText('密码')
    userEvent.type(passwordInput, 'some_password')

    userEvent.click(screen.getByTestId('submit-btn'))

    // 等待 res 过程中：loading
    expect(await screen.findByText(/正在登录/i)).toBeInTheDocument()

    // 成功创建后：loading 提示会消失
    await waitForElementToBeRemoved(() => screen.queryByText(/正在登录/i))

    // 成功创建后：出现 success 提示
    expect(await screen.findByText(`欢迎，${userName}`)).toBeInTheDocument()

    // Header 改变
    expect(
        screen.queryByRole('button', { name: /注册/i })
    ).not.toBeInTheDocument()
    expect(
        screen.queryByRole('button', { name: /登录/i })
    ).not.toBeInTheDocument()
    expect(screen.getByText(userName)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /登出/i })).toBeInTheDocument()

    // save token and userName to localStorage
    expect(localStorage.getItem('token')).toBe(token)
    expect(localStorage.getItem('userName')).toBe(userName)

    // 返回首页（这个 story 之后要修改）
    expect(await screen.findByTestId('post_list')).toBeInTheDocument()
})

test('user login failure', async () => {
    server.use(
        rest.post('/users/login', (req, res, ctx) => {
            return res(ctx.status(401), ctx.json({ message: '某个服务器错误' }))
        })
    )

    render(<App />)

    // 点击“登录”按钮后，进入 login 页面
    userEvent.click(screen.getByRole('button', { name: /登录/i }))

    // 输入用户名、密码，并提交
    const userNameInput = screen.getByLabelText('用户名')
    userEvent.type(userNameInput, userName)

    const passwordInput = screen.getByLabelText('密码')
    userEvent.type(passwordInput, 'some_password')

    userEvent.click(screen.getByTestId('submit-btn'))

    // 出现错误信息
    expect(await screen.findByText(/某个服务器错误/i)).toBeInTheDocument()
})
