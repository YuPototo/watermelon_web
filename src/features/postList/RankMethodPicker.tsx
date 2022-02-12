import React from 'react'

import { RankMethod } from './PostList'
import clsx from 'clsx'

type Props = {
    pickRankMethod: (rankMethod: RankMethod) => void
    showAll?: boolean
    className?: string
    rankMethod: 'all' | 'new'
}

export default function RankMethodPicker({
    showAll = true,
    className = '',
    rankMethod,
    pickRankMethod,
}: Props) {
    return (
        <div
            className={clsx(className, 'flex gap-2 rounded bg-white p-2 pl-4')}
        >
            <button
                className={clsx(
                    'rounded-full border border-white px-4 py-1  hover:border-green-50 hover:bg-green-50 hover:text-green-600',
                    {
                        'border-green-50 bg-green-50 font-medium text-green-600':
                            rankMethod === 'new',
                    },
                    { 'text-gray-500': rankMethod !== 'new' }
                )}
                onClick={() => pickRankMethod('new')}
            >
                最新
            </button>
            {showAll && (
                <button
                    className={clsx(
                        'rounded-full border border-white px-4 py-1  hover:border-green-50 hover:bg-green-50 hover:text-green-600',
                        {
                            'border-green-50 bg-green-50 font-medium text-green-600':
                                rankMethod === 'all',
                        },
                        { 'text-gray-500': rankMethod !== 'all' }
                    )}
                    onClick={() => pickRankMethod('all')}
                >
                    全站
                </button>
            )}
        </div>
    )
}
