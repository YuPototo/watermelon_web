/*
    1. community page 页，不显示“全站“按钮
    2. community page 页，显示该 community 的 post
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
        title: 'community title 1',
        body: 'community body 1',
        userId: 1,
        communityId: 1,
    },
    {
        id: 2,
        title: 'community title 2',
        body: null,
        userId: 1,
        communityId: 1,
    },
]

const handlers = [
    rest.get('/communities', (req, res, ctx) => {
        return res(
            ctx.json({
                communities: [{ id: 1, name: 'dota2' }],
            })
        )
    }),
    rest.get('/posts/community/1/new', (req, res, ctx) => {
        return res(
            ctx.json({
                posts: POSTS,
            }),
            ctx.delay(150)
        )
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

test('tourist visit community page', async () => {
    render(<App />)

    // 进入社区的按钮
    expect(await screen.findByText(/dota2/i)).toBeInTheDocument()
    userEvent.click(screen.getByText(/dota2/i))

    // 显示“最新”按钮
    expect(
        await screen.findByRole('button', { name: /最新/i })
    ).toBeInTheDocument()

    // 不显示“全站”按钮
    expect(
        screen.queryByRole('button', { name: /全站/i })
    ).not.toBeInTheDocument()

    // 显示 loading: 加载中
    expect(await screen.findByText('加载中...')).toBeInTheDocument()

    // 加载成功后，隐藏loading
    await waitForElementToBeRemoved(() => screen.queryByText(/加载中.../i))

    // 显示 posts
    expect(await screen.findByText(/community title 1/)).toBeInTheDocument()
    expect(await screen.findByText(/community body 1/)).toBeInTheDocument()
    expect(await screen.findByText(/community title 2/)).toBeInTheDocument()
})
