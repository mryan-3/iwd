import { HTMLAttributes } from 'react'

interface FlowerProps extends HTMLAttributes<SVGSVGElement> {
    size?: number
}

export function Lavender({ size = 40, className, ...props }: FlowerProps) {
    const sections = [20, 25, 30, 35, 40, 45]

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            className={className}
            {...props}
        >
            <path d="M30 55 L30 20" stroke="#a5d6a7" strokeWidth="2.5" strokeLinecap="round" />
            {sections.map((y, i) => (
                <g key={i}>
                    <ellipse cx={30 - (i % 2 === 0 ? 6 : 0)} cy={y} rx="4" ry="6"
                        fill={i < 2 ? "#9c27b0" : i < 4 ? "#ab47bc" : "#ce93d8"}
                        stroke="#7b1fa2" strokeWidth="0.8"
                        transform={`rotate(${i % 2 === 0 ? -20 : 20} ${i % 2 === 0 ? 24 : 30} ${y})`} />
                    {i % 2 === 0 && <ellipse cx={30 + 6} cy={y} rx="4" ry="6"
                        fill={i < 2 ? "#ab47bc" : "#ce93d8"}
                        stroke="#7b1fa2" strokeWidth="0.8"
                        transform={`rotate(20 36 ${y})`} />}
                </g>
            ))}
        </svg>
    )
}
