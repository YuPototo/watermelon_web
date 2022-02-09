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
        <div>
            {hasPrev && <Button onClick={onClickPrev}>上一页</Button>}
            {hasNext && <Button onClick={onClickNext}>下一页</Button>}
        </div>
    )
}
