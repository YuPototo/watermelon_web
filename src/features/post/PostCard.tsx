import React from 'react'
import { Post } from '../../types/Post'

type Props = {
    post: Post
    showCommunity: boolean
}

export default function PostCard({ post, showCommunity }: Props) {
    return (
        <div className="my-2">
            <h1>{post.title}</h1>
            <div>{post.body}</div>
            <div>{post.user.userName}</div>
            {showCommunity && <div>{post.community.name}</div>}
        </div>
    )
}
