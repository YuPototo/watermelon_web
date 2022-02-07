import React from 'react'
import CommunitySideList from '../../features/communityList/CommunitySideList'

export default function Home() {
    return (
        <div>
            <div>this is home page</div>
            <div>todo：post list</div>
            <div className="hidden md:block">
                <CommunitySideList />
            </div>
        </div>
    )
}
