import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
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
    const username = useAppSelector((state) => state.auth.userName)
    const isAuthor = post.user.userName === username

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
            <div
                className="text-sm text-gray-700"
                style={{ whiteSpace: 'pre-line' }}
            >
                {post.body}
            </div>
            <div className="mt-2 flex gap-4 text-xs text-gray-700">
                <Link
                    className=" hover:cursor-pointer hover:text-green-700"
                    to={{ pathname: `/p/${post.id}` }} // todo
                >
                    回复{post.commentCount > 0 && `(${post.commentCount})`}
                </Link>
                {isAuthor && (
                    <Link
                        className="hover:cursor-pointer hover:text-green-700"
                        to={{ pathname: '/editPost', state: { post } }}
                    >
                        编辑
                    </Link>
                )}
            </div>
        </div>
    )
}
