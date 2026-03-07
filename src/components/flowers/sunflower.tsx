import { HTMLAttributes } from 'react'

interface FlowerProps extends HTMLAttributes<SVGSVGElement> {
    size?: number
}

export function Sunflower({ size = 40, className, ...props }: FlowerProps) {
    const petals = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324]

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            {...props}
        >
            {petals.map((rot, i) => (
                <ellipse
                    key={i}
                    cx="30"
                    cy="12"
                    rx="5"
                    ry="12"
                    fill="#ffe082"
                    stroke="#ffca28"
                    strokeWidth="1"
                    transform={`rotate(${rot} 30 30)`}
                />
            ))}
            <circle cx="30" cy="30" r="10" fill="#8d6e63" stroke="#6d4c41" strokeWidth="1.5" />
            <circle cx="26" cy="27" r="2" fill="#6d4c41" opacity="0.7" />
            <circle cx="33" cy="26" r="2" fill="#6d4c41" opacity="0.7" />
            <circle cx="29" cy="33" r="1.5" fill="#6d4c41" opacity="0.7" />
            <path d="M30 40 Q29 49 28 56" stroke="#66bb6a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M29 48 Q23 46 22 50" stroke="#66bb6a" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}
