import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useHistory, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectIsLogin } from '../../features/auth/authSlice'
import { useGetCommunitiesQuery } from '../../features/community/communityService'
import SelectForumMenu from './SelectForumMenu'
import TextareaAutosize from 'react-textarea-autosize'
import { useCreatePostMutation } from '../../features/post/postService'
import Button from '../../components/Button'

export default function CreatePost() {
    const [communityId, setCommuntyId] = useState<number | undefined>(undefined)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const isLogin = useAppSelector(selectIsLogin)
    const history = useHistory()

    useEffect(() => {
        if (!isLogin) {
            toast.error('请登录后再发帖')
            setTimeout(() => {
                history.replace('signup?from=createPost')
            }, 1000)
        }
    }, [isLogin])

    const location = useLocation<{ communityId?: number }>()

    useEffect(() => {
        if (location.state?.communityId) {
            setCommuntyId(location.state.communityId)
        }
    }, [location])

    const { data: communities } = useGetCommunitiesQuery()
    const [createPost, { isLoading }] = useCreatePostMutation()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!communityId) {
            toast.error('需要选择社区')
            return
        }

        const loadingToastId = toast.loading('正在提交...')

        try {
            const post = await createPost({
                title,
                body,
                communityId,
            }).unwrap()
            toast.success('发布成功')
            setTimeout(() => {
                history.push(`p/${post.id}`)
            }, 1000)
        } catch (err) {
            // console.log(err) // 在 middleware 里处理了
        } finally {
            toast.dismiss(loadingToastId)
        }
    }

    return (
        <div className="page-container bg-white p-4">
            <h1 className="m-2 mb-4 text-lg text-green-600">发布帖子</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {communities ? (
                    <SelectForumMenu
                        communityId={communityId}
                        communities={communities}
                        selectCommunity={setCommuntyId}
                    />
                ) : (
                    <div className="text-red-500">社区列表加载失败</div>
                )}

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
