/*
    1. 用户会默认展示自己关注的社区的 posts 列表
    2. 点击“全站”按钮，会显示整个站点的信息
*/

import React from 'react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '../../../testUtils/testUtils'
import App from '../../../App'
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

const USER_POSTS = [
    {
        id: 1,
        title: 'user title 1',
        body: 'user post body 1',
        userId: 1,
        communityId: 1,
    },
    {
        id: 2,
        title: 'user title 2',
        body: null,
        userId: 1,
        communityId: 1,
    },
]

const ALL_POSTS = [
    {
        id: 3,
        title: 'all title 1',
        body: 'all post body 1',
        userId: 1,
        communityId: 1,
    },
]

const handlers = [
    rest.get('/posts/me/new', (req, res, ctx) => {
        return res(ctx.json({ posts: USER_POSTS }), ctx.delay(150))
    }),
    rest.get('/posts/all/new', (req, res, ctx) => {
        return res(ctx.json({ posts: ALL_POSTS }), ctx.delay(150))
    }),
]

const server = setupServer(...handlers, ...commonHandlers)

beforeAll(() => {
    server.listen()
    localStorage.setItem('userName', 'some_user')
    localStorage.setItem('token', 'some_token')
})

afterEach(() => server.resetHandlers())

afterAll(() => {
    localStorage.clear()
    server.close()
})

test('user homepage', async () => {
    render(<App />)

    // 显示“最新”按钮
    expect(screen.getByRole('button', { name: /最新/i })).toBeInTheDocument()

    // 显示 loading: 加载中
    expect(await screen.findByText('加载中...')).toBeInTheDocument()

    // 加载成功后，隐藏loading
    await waitForElementToBeRemoved(() => screen.queryByText(/加载中.../i))

    // 显示 posts
    expect(await screen.findByText(/user title 1/)).toBeInTheDocument()
    expect(await screen.findByText(/user post body 1/)).toBeInTheDocument()
    expect(await screen.findByText(/user title 2/)).toBeInTheDocument()
})

test('user clicks 全站 button', async () => {
    render(<App />)

    // 显示“全站”按钮
    expect(screen.queryByRole('button', { name: /全站/i })).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: /全站/i }))

    // 显示 loading: 加载中
    expect(await screen.findByText('加载中...')).toBeInTheDocument()

    // 加载成功后，隐藏loading
    await waitForElementToBeRemoved(() => screen.queryByText(/加载中.../i))

    // 显示 posts
    expect(await screen.findByText(/all title 1/)).toBeInTheDocument()
    expect(await screen.findByText(/all post body 1/)).toBeInTheDocument()
})

test('user click post card title', async () => {
    render(<App />)

    // 显示 posts
    expect(await screen.findByText(/user title 1/)).toBeInTheDocument()

    // click post title
    userEvent.click(screen.getByText(/user title 1/))

    expect(
        await screen.findByRole('heading', { name: /user title 1/ })
    ).toBeInTheDocument()
})
