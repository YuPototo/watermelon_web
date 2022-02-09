export interface Post {
    id: number
    title: string
    body: string
    createdAt: string
    updatedAt: string
    userId: number
    communityId: number
}

export interface PostList {
    posts: Post[]
}
