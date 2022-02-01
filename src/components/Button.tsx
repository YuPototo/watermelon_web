import React from 'react'
import clsx from 'clsx'

type ButtonColor = 'green' | 'red' | 'gray'

interface ButtonProps extends React.ComponentProps<'button'> {
    color?: ButtonColor
    outline?: boolean
    children?: React.ReactNode
}

export default function Button({
    color = 'green',
    outline = false,
    children,
    ...buttonProps
}: ButtonProps) {
    const baseStyle =
        'rounded-full border py-1 px-4 text-white shadow-md disabled:opacity-50'
    const outlineStyle = 'bg-transparent bg-white hover:text-white'

    const greenStyle = 'bg-green-500 hover:bg-green-700 border-green-500 '
    const greenOutlineStyle =
        'hover:bg-green-500 text-green-500 border-green-500'

    const colorCSS = {
        [`${greenStyle}`]: color === 'green' && !outline,
        [`${greenOutlineStyle}`]: color === 'green' && outline,
    }

    return (
        <button
            className={clsx(
                baseStyle,
                { [`${outlineStyle}`]: outline },
                colorCSS
            )}
            {...buttonProps}
        >
            {children}
        </button>
    )
}
