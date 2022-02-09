/*
    1. 会根据后端结果，显示“下一页”和“上一页”的按钮
    2. 点击“下一页”，会获取“下一页”的数据
    3. 点击“上一页”，会获取“上一页”的数据
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

const handlers = [
    rest.get('/posts/all/new', (req, res, ctx) => {
        const before = req.url.searchParams.get('before')
        const after = req.url.searchParams.get('after')

        if (after) {
            return res(
                ctx.json({
                    hasPrev: true,
                    hasNext: false,
                    posts: [
                        {
                            id: 2,
                            title: 'test title 2',
                            body: 'test body 2',
                            user: {
                                id: 1,
                                userName: 'test_user',
                            },
                            community: {
                                id: 1,
                                name: 'test_community',
                            },
                        },
                    ],
                })
            )
        }

        if (before) {
            // 注意：这里估计让存在 before query 时返回不同于最开始的 posts
            return res(
                ctx.json({
                    hasPrev: false,
                    hasNext: true,
                    posts: [
                        {
                            id: 3,
                            title: 'test title 3',
                            body: 'test body 3',
                            user: {
                                id: 1,
                                userName: 'test_user',
                            },
                            community: {
                                id: 1,
                                name: 'test_community',
                            },
                        },
                    ],
                })
            )
        }

        return res(
            ctx.json({
                hasPrev: false,
                hasNext: true,
                posts: [
                    {
                        id: 1,
                        title: 'test title 1',
                        body: 'test body 1',
                        user: {
                            id: 1,
                            userName: 'test_user',
                        },
                        community: {
                            id: 1,
                            name: 'test_community',
                        },
                    },
                ],
            })
        )
    }),
]

const server = setupServer(...handlers, ...commonHandlers)

beforeAll(() => {
    server.listen()
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('should display next page', async () => {
    render(<App />)

    // 显示下一页按钮
    expect(await screen.findByText('下一页')).toBeInTheDocument()
    userEvent.click(screen.getByText('下一页'))

    // 进入下一页
    await waitForElementToBeRemoved(() => screen.queryByText(/test title 1/i))

    expect(await screen.findByText(/test title 2/)).toBeInTheDocument()
    expect(await screen.findByText(/test body 2/)).toBeInTheDocument()
    expect(await screen.findByText('上一页')).toBeInTheDocument()
    userEvent.click(screen.getByText('上一页'))

    // 进入下一页
    await waitForElementToBeRemoved(() => screen.queryByText(/test title 2/i))
    expect(await screen.findByText(/test title 3/)).toBeInTheDocument()
    expect(await screen.findByText(/test body 3/)).toBeInTheDocument()
})
