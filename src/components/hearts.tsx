import { HTMLAttributes } from 'react'

interface HeartProps extends HTMLAttributes<SVGSVGElement> {
    size?: number
    color?: string
}

export function Heart({ size = 24, color = '#5B2C8D', className, ...props }: HeartProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
            <path
                d="M12 21 C11 20 3 14.5 2.5 9.5 C2 5.5 5 3 8 3.5 C9.5 3.8 11 5 12 6.5 C13 5 14.5 3.8 16 3.5 C19 3 22 5.5 21.5 9.5 C21 14.5 13 20 12 21 Z"
                fill={color} stroke={color} strokeWidth="0.5" strokeLinejoin="round"
            />
        </svg>
    )
}

export function HeartOutline({ size = 24, color = '#5B2C8D', className, ...props }: HeartProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
            <path
                d="M12 21 C11 20 3 14.5 2.5 9.5 C2 5.5 5 3 8 3.5 C9.5 3.8 11 5 12 6.5 C13 5 14.5 3.8 16 3.5 C19 3 22 5.5 21.5 9.5 C21 14.5 13 20 12 21 Z"
                fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
            />
        </svg>
    )
}

const HEART_POSITIONS = [
    { x: 3, y: 5, size: 16, color: '#4B275F', rot: -12, opacity: 0.25, outline: false },
    { x: 88, y: 8, size: 12, color: '#5D7A61', rot: 8, opacity: 0.2, outline: true },
    { x: 92, y: 22, size: 20, color: '#9e7dc2', rot: -5, opacity: 0.25, outline: false },
    { x: 5, y: 25, size: 10, color: '#8ba98f', rot: 15, opacity: 0.3, outline: true },
    { x: 1, y: 55, size: 18, color: '#331A41', rot: -8, opacity: 0.15, outline: false },
    { x: 95, y: 60, size: 14, color: '#5D7A61', rot: 10, opacity: 0.2, outline: true },
    { x: 7, y: 80, size: 12, color: '#4B275F', rot: -20, opacity: 0.25, outline: false },
    { x: 91, y: 85, size: 16, color: '#9e7dc2', rot: 5, opacity: 0.3, outline: false },
    { x: 45, y: 2, size: 10, color: '#8ba98f', rot: -10, opacity: 0.2, outline: true },
    { x: 55, y: 97, size: 14, color: '#331A41', rot: 12, opacity: 0.2, outline: false },
]

export function ScatteredHearts() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {HEART_POSITIONS.map((h, i) => {
                const Component = h.outline ? HeartOutline : Heart
                return (
                    <div key={i} className="absolute transition-opacity duration-1000"
                        style={{ left: `${h.x}%`, top: `${h.y}%`, transform: `rotate(${h.rot}deg)`, opacity: h.opacity }}
                    >
                        <Component size={h.size} color={h.color} />
                    </div>
                )
            })}
        </div>
    )
}

