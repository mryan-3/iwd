import { HTMLAttributes } from 'react'

interface FlowerProps extends HTMLAttributes<SVGSVGElement> {
    size?: number
}

export function Daisy({ size = 40, className, ...props }: FlowerProps) {
    const petals = [0, 40, 80, 120, 160, 200, 240, 280, 320]

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
                    cy="14"
                    rx="5"
                    ry="11"
                    fill="#fce4ec"
                    stroke="#f8bbd0"
                    strokeWidth="1"
                    transform={`rotate(${rot} 30 30)`}
                    opacity="0.95"
                />
            ))}
            <circle cx="30" cy="30" r="8" fill="#ffe082" stroke="#ffd54f" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="4" fill="#ffca28" />
            <path d="M30 38 Q29 47 28 55" stroke="#81c784" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    )
}
