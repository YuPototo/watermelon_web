import React from 'react'
import { Post } from '../../types/Post'

type Props = {
    post: Post
}

export default function PostCard({ post }: Props) {
    return (
        <div className="bg-red-200">
            <h1>{post.title}</h1>
            <div>{post.body}</div>
        </div>
    )
}
