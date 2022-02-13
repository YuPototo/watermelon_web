import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCommunitiesQuery } from './communityService'

type Props = {
    className?: string
}
export default function CommunitySideList({ className = '' }: Props) {
    const { data } = useGetCommunitiesQuery()

    if (!data) return <></>

    return (
        <div className={clsx(className, 'rounded bg-white p-3')}>
            <h3 className="text-green-600">社区列表</h3>
            <div>
                {data.map(({ id, name }) => (
                    <Link
                        className="block rounded py-1 pl-2 text-gray-500 hover:bg-green-100 hover:text-gray-800"
                        key={id}
                        to={{ pathname: `/c/${id}`, state: { name } }}
                    >
                        {name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
