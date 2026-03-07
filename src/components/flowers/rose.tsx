import { HTMLAttributes } from 'react'

interface FlowerProps extends HTMLAttributes<SVGSVGElement> {
    size?: number
}

export function Rose({ size = 40, className, ...props }: FlowerProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            {...props}
        >
            <ellipse cx="30" cy="18" rx="8" ry="13" fill="#f48fb1" stroke="#e91e8c" strokeWidth="1" transform="rotate(-15 30 30)" opacity="0.9" />
            <ellipse cx="30" cy="18" rx="8" ry="13" fill="#f06292" stroke="#e91e8c" strokeWidth="1" transform="rotate(30 30 30)" opacity="0.85" />
            <ellipse cx="30" cy="18" rx="8" ry="13" fill="#ec407a" stroke="#e91e8c" strokeWidth="1" transform="rotate(75 30 30)" opacity="0.8" />
            <ellipse cx="30" cy="18" rx="8" ry="13" fill="#f48fb1" stroke="#e91e8c" strokeWidth="1" transform="rotate(120 30 30)" opacity="0.85" />
            <ellipse cx="30" cy="18" rx="8" ry="13" fill="#f06292" stroke="#e91e8c" strokeWidth="1" transform="rotate(165 30 30)" opacity="0.9" />
            <circle cx="30" cy="30" r="8" fill="#e91e8c" stroke="#c2185b" strokeWidth="1" />
            <circle cx="30" cy="30" r="4" fill="#c2185b" />
            <path d="M30 38 Q28 48 26 55" stroke="#66bb6a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M28 46 Q22 44 20 48" stroke="#66bb6a" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}
