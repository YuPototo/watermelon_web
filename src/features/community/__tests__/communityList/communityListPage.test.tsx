/*
    story: 通过 navBar 进入 communities 列表页面
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

test('enter communityListPage', async () => {
    render(<App />)

    // 显示"社区列表”按钮
    expect(
        screen.getByRole('button', { name: /社区列表/i })
    ).toBeInTheDocument()

    // 点击社区列表，进入社区列表页
    userEvent.click(screen.getByRole('button', { name: /社区列表/i }))
    expect(
        screen.getByRole('heading', { name: /社区列表/i })
    ).toBeInTheDocument()

    // 显示社区列表
    expect(await screen.findByText(/dota2/i)).toBeInTheDocument()
    expect(await screen.findByText(/web/i)).toBeInTheDocument()
})
