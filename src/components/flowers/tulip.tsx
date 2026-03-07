import { HTMLAttributes } from 'react'

interface FlowerProps extends HTMLAttributes<SVGSVGElement> {
    size?: number
}

export function Tulip({ size = 40, className, ...props }: FlowerProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            {...props}
        >
            <path d="M30 8 C22 10 16 18 17 26 C18 32 24 36 30 36 C36 36 42 32 43 26 C44 18 38 10 30 8 Z"
                fill="#f06292" stroke="#e91e8c" strokeWidth="1.5" />
            <path d="M30 10 C26 12 24 18 25 24 C26 28 28 31 30 32"
                stroke="#e91e8c" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
            <path d="M30 36 L30 54" stroke="#66bb6a" strokeWidth="3" strokeLinecap="round" />
            <path d="M30 46 C26 42 20 42 18 45" stroke="#66bb6a" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M30 50 C34 46 40 46 42 49" stroke="#66bb6a" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
    )
}
