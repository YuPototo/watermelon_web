import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCommunitiesQuery } from './communityService'

export default function CommunitySideList() {
    const { data } = useGetCommunitiesQuery()

    if (!data) return <></>

    return (
        <div>
            <h3>社区列表</h3>
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
        </div>
    )
}
