import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

export default function NoMatch() {
    return (
        <div className="page-container rounded bg-white p-4">
            <div>找不到页面...</div>
            <Link className="mt-2 block" to="/">
                <Button> 返回首页</Button>
            </Link>
        </div>
    )
}
