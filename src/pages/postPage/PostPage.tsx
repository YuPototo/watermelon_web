import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import PostCard from '../../features/post/PostCard'
import { useGetPostQuery } from '../../features/post/postService'
import { Post } from '../../types/Post'

export default function PostPage() {
    const [post, setPost] = useState<Post | undefined>(undefined)
    const { postId } = useParams<{ postId: string }>()

    const postFromStore = useAppSelector((state) => state.post.post)
    const { data: postFromServer, isLoading } = useGetPostQuery(
        parseInt(postId),
        {
            skip: postFromStore !== null,
        }
    )

    useEffect(() => {
        if (postFromStore) setPost(postFromStore)
        if (postFromServer) setPost(postFromServer)
    }, [postFromStore, postFromServer])

    return (
        <div>
            {isLoading && <div>加载中...</div>}
            {post && <PostCard post={post} />}
        </div>
    )
}
