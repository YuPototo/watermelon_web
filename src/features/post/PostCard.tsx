import clsx from 'clsx'
import React from 'react'
import { Post } from '../../types/Post'

type Props = {
    post: Post
    showCommunity: boolean
    className?: string
    onToPost?: (post: Post) => void
}

export default function PostCard({
    post,
    showCommunity,
    className,
    onToPost,
}: Props) {
    const handleClickPost = () => {
        if (onToPost) {
            onToPost(post)
        }
    }
    return (
        <div
            className={clsx(
                className,
                'rounded border border-solid border-gray-200 bg-white px-4 py-2 hover:border-gray-300'
            )}
        >
            <div className="">
                {showCommunity && (
                    <span className="mr-2  text-xs">{post.community.name}</span>
                )}
                <span className="text-xs text-gray-500">
                    {post.user.userName}
                </span>
            </div>

            <h1
                className={clsx('my-2 text-lg text-gray-900', {
                    'hover:cursor-pointer': onToPost,
                })}
                onClick={handleClickPost}
            >
                {post.title}
            </h1>
            <div className="text-sm text-gray-700">{post.body}</div>
        </div>
    )
}
