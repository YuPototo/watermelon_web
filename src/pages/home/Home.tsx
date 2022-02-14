import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import CommunitySideList from '../../features/community/CommunitySideList'
import PostList from '../../features/postList/PostList'

export default function Home() {
    return (
        <div className="page-container md:grid md:grid-cols-12 md:gap-4">
            <PostList className="col-span-9" />
            <div className="hidden md:col-span-3 md:flex md:flex-col md:gap-3">
                <div className="rounded bg-white p-4">
                    <Link to="/createPost">
                        <Button outline className="w-full">
                            发帖
                        </Button>
                    </Link>
                </div>
                <CommunitySideList />
            </div>
        </div>
    )
}
