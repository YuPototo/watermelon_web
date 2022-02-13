import React from 'react'
import { Link } from 'react-router-dom'
import CommunitySideList from '../../features/community/CommunitySideList'
import PostList from '../../features/postList/PostList'

export default function Home() {
    return (
        <div className="page-container md:grid md:grid-cols-12 md:gap-4">
            <PostList className="col-span-9" />
            <div className="hidden  md:col-span-3 md:block">
                <div>
                    <Link to="/createPost">去发帖</Link>
                </div>
                <CommunitySideList />
            </div>
        </div>
    )
}
