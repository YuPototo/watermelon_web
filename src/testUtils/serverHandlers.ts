import { rest } from 'msw'

export const commonHandlers = [
    rest.get('/communities', (req, res, ctx) => {
        return res(ctx.json({ communities: [] }))
    }),
    rest.get('/posts/all/new', (req, res, ctx) => {
        return res(ctx.json({ posts: [] }))
    }),
    rest.get('/posts/me/new', (req, res, ctx) => {
        return res(ctx.json({ posts: [] }))
    }),
    rest.get('/posts/community/*/new', (req, res, ctx) => {
        return res(ctx.json({ posts: [] }))
    }),
    rest.get('/communityUser/*', (req, res, ctx) => {
        return res(ctx.json({ isMember: true }))
    }),
]
