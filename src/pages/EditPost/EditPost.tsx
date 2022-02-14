import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useHistory, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectIsLogin } from '../../features/auth/authSlice'
import TextareaAutosize from 'react-textarea-autosize'
import { Post } from '../../types/Post'
import Button from '../../components/Button'
import { useUpdatePostMutation } from '../../features/post/postService'

export default function EditPost() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const isLogin = useAppSelector(selectIsLogin)
    const history = useHistory()

    useEffect(() => {
        if (!isLogin) {
            toast.error('请登录后再发帖')
            setTimeout(() => {
                history.replace('signup?from=editPost')
            }, 1000)
        }
    }, [isLogin])

    const location = useLocation<{ post: Post }>()
    useEffect(() => {
        const post = location.state.post
        setTitle(post.title)
        setBody(post.body)
    }, [location])

    const [updatePost, { isLoading }] = useUpdatePostMutation()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const loadingToastId = toast.loading('等待中...')
        const postId = location.state.post.id
        try {
            await updatePost({
                postId,
                body,
                title,
            }).unwrap()
            toast.success('更新成功')

            setTimeout(() => {
                history.push(`/p/${postId}`)
            }, 1000)
        } catch (err) {
            // console.log(err)
        } finally {
            toast.dismiss(loadingToastId)
        }
    }

    return (
        <div className="page-container bg-white p-4">
            <h1 className="m-2 mb-4 text-lg text-green-600">编辑帖子</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>{location.state.post.community.name}</div>
                <TextareaAutosize
                    className="text-input"
                    id="title"
                    name="title"
                    placeholder="标题"
                    rows={2}
                    value={title}
                    autoFocus
                    disabled={isLoading}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextareaAutosize
                    className="text-input"
                    id="body"
                    name="body"
                    value={body}
                    minRows={3}
                    placeholder="正文"
                    disabled={isLoading}
                    onChange={(e) => setBody(e.target.value)}
                />
                <div className="ml-4">
                    <Button type="submit" disabled={isLoading}>
                        发布
                    </Button>
                </div>
            </form>
        </div>
    )
}
