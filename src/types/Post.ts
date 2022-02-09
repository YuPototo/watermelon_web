export interface Post {
    id: number
    title: string
    body: string
    createdAt: string
    updatedAt: string
    user: {
        id: number
        userName: string
    }
    community: {
        id: number
        name: string
    }
}

export interface PostList {
    posts: Post[]
}
