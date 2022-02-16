import clsx from 'clsx'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '../../components/Button'
import {
    useAddCommentMutation,
    useUpdateCommentMutation,
} from './commentService'

type MutateType = 'add' | 'update'

type Props = {
    mutateType: MutateType
    postId: number
    className?: string
    body?: string
    commentId?: number
    onFinish?: () => void
}

export default function CommentForm({
    mutateType,
    postId,
    className,
    body = '',
    commentId,
    onFinish,
}: Props) {
    const [comment, setComment] = useState(body)

    const [addComment, { isLoading: isAdding }] = useAddCommentMutation()
    const [updateComment, { isLoading: isUpdating }] =
        useUpdateCommentMutation()

    const submitComment = async (event: React.FormEvent) => {
        event.preventDefault()

        const loadingToastId = toast.loading('等待中...')

        try {
            if (mutateType === 'add') {
                await addComment({ postId, body: comment }).unwrap()
            } else if (mutateType === 'update') {
                await updateComment({
                    commentId: commentId as number,
                    body: comment,
                }).unwrap()
            }
            toast.success('评论成功')
            setComment('')
        } catch (err) {
            // 在 middleware 处理了
        } finally {
            toast.dismiss(loadingToastId)
            onFinish && onFinish()
        }
    }

    return (
        <div className={clsx('bg-white p-4', className)}>
            <form>
                <TextareaAutosize
                    className="text-input w-full"
                    placeholder="说说你的想法"
                    minRows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex gap-4">
                    <Button className="" onClick={submitComment}>
                        {mutateType === 'add' ? '发表评论' : '完成'}
                    </Button>
                    {mutateType === 'update' && (
                        <Button outline onClick={onFinish}>
                            取消
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
