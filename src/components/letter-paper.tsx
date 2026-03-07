import { FLOWER_COMPONENTS } from './flowers'
import { LetterData } from '../lib/encode'

interface LetterPaperProps {
    data: LetterData
}

import { motion } from 'framer-motion'

export function LetterPaper({ data }: LetterPaperProps) {
    const flowers = data.flowers.length > 0 ? data.flowers : ['rose', 'daisy']

    return (
        <div id="letter-content" className="bg-warm-white rounded-sm shadow-[0_16px_40px_rgba(75,39,95,0.12),0_4px_12px_rgba(0,0,0,0.06)] max-w-3xl mx-auto relative overflow-hidden border border-purple-50">
            {/* Subtle paper texture overlay (simulated with faint repeating lines/dots) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#4B275F 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="px-5 md:px-14 py-8 md:py-12 flex flex-col gap-8 md:gap-10 relative z-10">
                {/* Elegant Top Floral Motif */}
                <div className="flex justify-center opacity-80 mt-2">
                    <FlowerRow flowers={flowers} delay={0.4} />
                </div>

                <div className="space-y-5 md:space-y-6 text-center">
                    <div className="font-handwriting text-2xl md:text-3xl font-medium text-purple-600 italic px-2 md:px-4">Dear {data.to},</div>
                    <div className="font-handwriting text-xl md:text-[1.45rem] text-purple-600 leading-[1.7] md:leading-[1.8] whitespace-pre-wrap wrap-break-word max-w-xl mx-auto tracking-wide px-2 md:px-6">
                        {data.message}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 pt-6 md:pt-8 pb-4 md:pb-6">
                    <div className="font-ui text-[0.65rem] uppercase tracking-widest text-green-400 font-medium">{data.signOff || 'With deepest appreciation'}</div>
                    <div className="font-handwriting text-[1.75rem] md:text-[2rem] font-semibold text-purple-600 italic">{data.from}</div>
                </div>
            </div>

            <div className="bg-purple-50 border-t border-purple-100 py-6 px-4 text-center">
                <div className="text-[0.6rem] uppercase tracking-[0.2em] text-purple-400 font-ui font-medium">
                    International Women&apos;s Day &middot; 8 March 2026
                </div>
            </div>
        </div>
    )
}

function FlowerRow({ flowers, delay = 0 }: { flowers: string[], delay?: number }) {
    return (
        <div className="flex items-center justify-center gap-4">
            <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 48, opacity: 1 }}
                transition={{ duration: 0.8, delay: delay }}
                className="h-px bg-green-200"
            />
            {flowers.slice(0, 3).map((id, i) => {
                const Flower = FLOWER_COMPONENTS[id] || FLOWER_COMPONENTS.rose
                return (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: delay + (i * 0.15) }}
                    >
                        <Flower size={26} className="shrink-0 drop-shadow-sm" />
                    </motion.div>
                )
            })}
            <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 48, opacity: 1 }}
                transition={{ duration: 0.8, delay: delay }}
                className="h-px bg-green-200"
            />
        </div>
    )
}


