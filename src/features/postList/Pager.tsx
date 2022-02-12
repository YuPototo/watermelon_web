import clsx from 'clsx'
import React from 'react'
import Button from '../../components/Button'

interface Props {
    hasNext: boolean
    hasPrev: boolean
    onClickNext: () => void
    onClickPrev: () => void
}
export default function Pager({
    hasNext,
    hasPrev,
    onClickNext,
    onClickPrev,
}: Props) {
    return (
        <div className="flex justify-between">
            <Button
                className={clsx({ invisible: !hasPrev })}
                onClick={onClickPrev}
            >
                上一页
            </Button>
            <Button
                className={clsx({ invisible: !hasNext })}
                onClick={onClickNext}
            >
                下一页
            </Button>
        </div>
    )
}
