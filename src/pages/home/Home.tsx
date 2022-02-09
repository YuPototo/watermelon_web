import React from 'react'
import CommunitySideList from '../../features/communityList/CommunitySideList'
import PostList from '../../features/postList/PostList'

export default function Home() {
    return (
        <div>
            <div>this is home page</div>
            <div>
                <PostList />
            </div>

            <div className="mt-10 hidden md:block">
                <CommunitySideList />
            </div>
        </div>
    )
}
