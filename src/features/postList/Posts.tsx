import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { Post } from '../../types/Post'
import { setPost } from '../post/postSlice'

interface Props {
    posts: Post[]
}

export default function Posts({ posts }: Props) {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const handleClickPostCard = (post: Post) => {
        dispatch(setPost(post))
        history.push(`/p/${post.id}`)
    }
    return (
        <div>
            {posts.map((post) => (
                <div
                    className="my-4 ml-2"
                    key={post.id}
                    onClick={() => handleClickPostCard(post)}
                >
                    <div>{post.title}</div>
                    <div>{post.body}</div>
                </div>
            ))}
        </div>
    )
}
