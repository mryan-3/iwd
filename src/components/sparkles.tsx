'use client'

const SPARKLE_POSITIONS = [
    [8, 12], [22, 55], [38, 30], [55, 78], [70, 15], [85, 60],
    [15, 85], [45, 5], [62, 45], [90, 25], [30, 70], [75, 92]
]

const COLORS = ['#dce7dd', '#FDFDF9', '#b5ccb8']

export function Sparkles() {
    return (
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
            {SPARKLE_POSITIONS.map(([left, top], i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full animate-pulse shadow-sm"
                    style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        backgroundColor: COLORS[i % COLORS.length],
                        animationDelay: `${(i * 0.4) % 3}s`,
                        animationDuration: `${3.5 + (i % 3)}s`,
                    }}
                />
            ))}
        </div>
    )
}

