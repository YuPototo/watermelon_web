import clsx from 'clsx'
import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Comment } from '../../types/Comment'
import CommentForm from './CommentForm'

type Props = {
    comment: Comment
    className?: string
}

export default function CommentCard({ comment, className }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const username = useAppSelector((state) => state.auth.userName)
    const isAuthor = comment.user.userName === username

    return (
        <div className={clsx('rounded bg-white p-3', className)}>
            <div className="mb-2 text-xs text-gray-600">
                {comment.user.userName}
            </div>

            {isEditing ? (
                <CommentForm
                    mutateType="update"
                    postId={comment.postId}
                    body={comment.body}
                    commentId={comment.id}
                    onFinish={() => setIsEditing(false)}
                />
            ) : (
                <div style={{ whiteSpace: 'pre-line' }}>{comment.body}</div>
            )}

            {isAuthor && (
                <div className="mt-2 text-xs text-gray-700">
                    <button
                        className=" hover:cursor-pointer hover:text-green-700"
                        onClick={() => setIsEditing(true)}
                    >
                        编辑
                    </button>
                </div>
            )}
        </div>
    )
}
