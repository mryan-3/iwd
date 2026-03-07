import { HTMLAttributes } from 'react'

interface FlowerProps extends HTMLAttributes<SVGSVGElement> {
    size?: number
}

export function Peony({ size = 40, className, ...props }: FlowerProps) {
    const outerPetals = [0, 45, 90, 135, 180, 225, 270, 315]
    const innerPetals = [22, 67, 112, 157, 202, 247, 292, 337]

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            {...props}
        >
            {outerPetals.map((rot, i) => (
                <ellipse
                    key={i}
                    cx="30"
                    cy="16"
                    rx="7"
                    ry="12"
                    fill={i % 2 === 0 ? "#f48fb1" : "#f06292"}
                    stroke="#e91e8c"
                    strokeWidth="0.8"
                    transform={`rotate(${rot} 30 30)`}
                    opacity="0.88"
                />
            ))}
            {innerPetals.map((rot, i) => (
                <ellipse
                    key={`i${i}`}
                    cx="30"
                    cy="19"
                    rx="5"
                    ry="9"
                    fill="#fce4ec"
                    stroke="#f8bbd0"
                    strokeWidth="0.8"
                    transform={`rotate(${rot} 30 30)`}
                    opacity="0.8"
                />
            ))}
            <circle cx="30" cy="30" r="7" fill="#e91e8c" stroke="#c2185b" strokeWidth="1" />
            <path d="M30 37 Q29 46 28 54" stroke="#81c784" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    )
}
