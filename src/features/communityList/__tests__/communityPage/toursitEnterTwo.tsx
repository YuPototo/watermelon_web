/*
    story: 游客可以通过 community side list 进入 community page，页面显示 community 名称
*/

import React from 'react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen } from '../../../../test_utils'
import App from '../../../../App'

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
const server = setupServer(...handlers)

beforeAll(() => {
    server.listen()
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('tourist enters community page through community side list', async () => {
    render(<App />)

    // 进入 dota2 社区
    expect(
        await screen.findByRole('link', { name: /dota2/i })
    ).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: /dota2/i }))

    // 显示 title
    expect(
        await screen.findByRole('heading', { name: /dota2/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /加入/i })).toBeInTheDocument()
})
