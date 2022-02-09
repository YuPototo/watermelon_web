/*
    1. Tourist 访问首页时，会显示全站最新的 posts
    2. Tourist 点击 post title 和 body 时，会进入 post 页
*/

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

const POSTS = [
    {
        id: 1,
        title: 'test title 1',
        body: 'test body 1',
        userId: 1,
        communityId: 1,
    },
    {
        id: 2,
        title: 'test title 2',
        body: null,
        userId: 1,
        communityId: 1,
    },
]

const handlers = [
    rest.get('/posts/all/new', (req, res, ctx) => {
        return res(ctx.json({ posts: POSTS }), ctx.delay(150))
    }),
]

const server = setupServer(...handlers, ...commonHandlers)

beforeAll(() => {
    server.listen()
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('tourist visit home page', async () => {
    render(<App />)

    // 显示“最新”按钮
    expect(screen.getByRole('button', { name: /最新/i })).toBeInTheDocument()

    // 不显示“全站”按钮
    expect(
        screen.queryByRole('button', { name: /全站/i })
    ).not.toBeInTheDocument()

    // 显示 loading: 加载中
    expect(await screen.findByText('加载中...')).toBeInTheDocument()

    // 加载成功后，隐藏loading
    await waitForElementToBeRemoved(() => screen.queryByText(/加载中.../i))

    // 显示 posts
    expect(await screen.findByText(/test title 1/)).toBeInTheDocument()
    expect(await screen.findByText(/test body 1/)).toBeInTheDocument()
    expect(await screen.findByText(/test title 2/)).toBeInTheDocument()
})

test('tourist click page title or body to enter post page', async () => {
    render(<App />)

    // 显示 posts
    expect(await screen.findByText(/test title 1/)).toBeInTheDocument()

    // click post title
    userEvent.click(screen.getByText(/test title 1/))

    expect(
        await screen.findByRole('heading', { name: /test title 1/ })
    ).toBeInTheDocument()
})
