/*
    Story: 点击“发布帖子”按钮，来发帖。
*/

import React from 'react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen } from '../../../testUtils/testUtils'
import App from '../../../App'
import { commonHandlers } from '../../../testUtils/serverHandlers'

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
