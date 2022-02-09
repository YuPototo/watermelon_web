import React from 'react'

import { RankMethod } from './PostList'

type Props = {
    pickRankMethod: (rankMethod: RankMethod) => void
    showAll?: boolean
}

export default function RankMethodPicker({
    showAll = true,
    pickRankMethod,
}: Props) {
    return (
        <div>
            <button onClick={() => pickRankMethod('new')}>最新</button>
            {showAll && (
                <button onClick={() => pickRankMethod('all')}>全站</button>
            )}
        </div>
    )
}
