import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCommunitiesQuery } from '../../features/communityList/communityService'

export default function CommunityListPage() {
    const { data } = useGetCommunitiesQuery()
    return (
        <div className="page-container rounded bg-white p-4">
            <h1 className="mb-4 text-xl text-green-600">社区列表</h1>
            {data && (
                <>
                    {data.map(({ id, name }) => (
                        <Link
                            className="my-2 block rounded p-2 pl-4 hover:bg-green-100"
                            key={id}
                            to={{ pathname: `/c/${name}`, state: { name, id } }}
                        >
                            {name}
                        </Link>
                    ))}
                </>
            )}
        </div>
    )
}
