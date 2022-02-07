/*
    story: 用户通过 communityListPage 进入 community page 后，获取是否已经加入社区的状态，返回未加入，然后用户点击“加入”按钮
*/

import React from 'react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '../../../../test_utils'
import App from '../../../../App'

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
    rest.get('/communities', (req, res, ctx) => {
        return res(
            ctx.json({
                communities: [
                    { id: 1, name: 'dota2' },
                    { id: 2, name: 'web' },
                ],
            }),
            ctx.delay(150)
        )
    }),
    rest.get('/communityUser/*', (req, res, ctx) => {
        return res(ctx.json({ isMember: false }))
    }),
    rest.put('/communityUser/*', (req, res, ctx) => {
        return res(ctx.json(1), ctx.delay(150))
    }),
]
const server = setupServer(...handlers)

const userName = 'testUser'
const token = 'testToken'

beforeAll(() => {
    server.listen()
    localStorage.setItem('userName', userName)
    localStorage.setItem('token', token)
})

afterEach(() => server.resetHandlers())

afterAll(() => {
    localStorage.clear()
    server.close()
})

test('tourist enters community page through communityListPage', async () => {
    render(<App />)

    // 进入社区列表页
    userEvent.click(screen.getByRole('button', { name: /社区列表/i }))

    // 进入 dota2 社区
    expect(await screen.findByText(/dota2/i)).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: /dota2/i }))

    // 显示 title
    expect(
        await screen.findByRole('heading', { name: /dota2/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /加入/i })).toBeInTheDocument()

    // 点击加入按钮
    userEvent.click(screen.getByRole('button', { name: /加入/i }))

    // 出现 loading
    expect(await screen.findByText(/正在加入.../i)).toBeInTheDocument()

    // 成功加入后：loading 提示会消失，出现成功提示
    await waitForElementToBeRemoved(() => screen.queryByText(/正在加入.../i))
    expect(await screen.findByText(/已加入社区/i)).toBeInTheDocument()

    // 出现“离开”按钮
    expect(screen.getByRole('button', { name: /离开/i })).toBeInTheDocument()
})