import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCommunitiesQuery } from '../../features/communityList/communityService'

export default function CommunityListPage() {
    const { data } = useGetCommunitiesQuery()
    return (
        <div>
            <h1>社区列表</h1>
            {data && (
                <div>
                    {data.map(({ id, name }) => (
                        <Link
                            key={id}
                            to={{ pathname: `/c/${name}`, state: { name, id } }}
                        >
                            {name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
