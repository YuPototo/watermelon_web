/*
    story: 游客可以通过 communityListPage 进入 community page，页面显示 community 名称
*/

import React from 'react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen } from '../../../../testUtils/testUtils'
import App from '../../../../App'
import { commonHandlers } from '../../../../testUtils/serverHandlers'

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
]

const server = setupServer(...handlers, ...commonHandlers)

beforeAll(() => {
    server.listen()
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

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
})
