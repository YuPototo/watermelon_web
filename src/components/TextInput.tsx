import clsx from 'clsx'
import React from 'react'

interface Props extends React.ComponentProps<'input'> {
    className?: string
}
export default function TextInput({ className, ...props }: Props) {
    const baseStyle =
        'rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none focus:ring focus:ring-green-100'
    return <input className={clsx(baseStyle, className)} {...props}></input>
}
