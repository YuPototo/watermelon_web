/*
    Story: （屏幕大于 md 时）首页右侧显示 community list，点击后进入社区页

    技术债：jsdom 不支持测试 responsive design
    https://stackoverflow.com/questions/64281467/react-testing-library-rtl-test-a-responsive-design
*/

import React from 'react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen } from '../../../../testUtils/testUtils'
import App from '../../../../App'
import { commonHandlers } from '../../../../testUtils/serverHandlers'

const Res = {
    communities: [
        { id: 1, name: 'dota2' },
        { id: 2, name: 'web' },
    ],
}

const handlers = [
    rest.get('/communities', (req, res, ctx) => {
        return res(ctx.json(Res), ctx.delay(150))
    }),
]
const server = setupServer(...handlers, ...commonHandlers)

beforeAll(() => {
    server.listen()
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('enter homepage', async () => {
    render(<App />)

    // 显示社区列表
    expect(
        await screen.findByRole('heading', { name: /社区列表/i })
    ).toBeInTheDocument()
    expect(await screen.findByText(/dota2/i)).toBeInTheDocument()
    expect(await screen.findByText(/web/i)).toBeInTheDocument()

    // 进入社区
    userEvent.click(screen.getByText(/dota2/i))
    expect(
        await screen.findByRole('heading', { name: /dota2/i })
    ).toBeInTheDocument()
})
