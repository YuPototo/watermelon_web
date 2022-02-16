import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import CommentCard from '../../features/comment/CommentCard'
import { useGetCommentsQuery } from '../../features/comment/commentService'
import PostCard from '../../features/post/PostCard'
import CommentForm from '../../features/comment/CommentForm'
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

    const { data: comments } = useGetCommentsQuery(parseInt(postId), {
        skip: !post || post.commentCount === 0,
    })

    useEffect(() => {
        if (postFromStore) setPost(postFromStore)
        if (postFromServer) setPost(postFromServer)
    }, [postFromStore, postFromServer])

    return (
        <div className="page-container">
            {isLoading && <div>加载中...</div>}
            {post && <PostCard post={post} showCommunity={true} />}

            {post && (
                <CommentForm
                    className="mt-4"
                    postId={post.id}
                    mutateType="add"
                />
            )}
            <div>
                {comments?.map((comment) => (
                    <CommentCard
                        className="my-2"
                        comment={comment}
                        key={comment.id}
                    />
                ))}
            </div>
        </div>
    )
}
