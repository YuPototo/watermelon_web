import { rest } from 'msw'

export const commonHandlers = [
    rest.get('/communities', (req, res, ctx) => {
        return res(ctx.json({ communities: [] }))
    }),
]
