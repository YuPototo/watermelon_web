export interface Comment {
    id: number
    body: string
    postId: number
    createdAt: string
    updatedAt: string
    user: {
        id: number
        userName: string
    }
}
