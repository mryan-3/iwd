import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from './hearts'
import { FLOWER_COMPONENTS } from './flowers'

interface EnvelopeProps {
    phase: 'sealed' | 'opening' | 'open'
    onOpen: () => void
    flowers?: string[]
}

const BLOOM_POSITIONS = [
    { x: -140, y: -200, scale: 1.6, rotate: -25, delay: 0.05, rotStart: 15, rotVar: 8 },
    { x: 140, y: -180, scale: 1.2, rotate: 35, delay: 0.15, rotStart: -45, rotVar: -12 },
    { x: -60, y: -260, scale: 1.4, rotate: 15, delay: 0.25, rotStart: 60, rotVar: 15 },
    { x: 70, y: -240, scale: 1.8, rotate: -20, delay: 0.35, rotStart: -80, rotVar: -8 },
]

export function Envelope({ phase, onOpen, flowers = ['rose', 'daisy'] }: EnvelopeProps) {
    const displayFlowers = flowers.length > 0 ? flowers : ['rose', 'daisy']

    return (
        <div
            className={`relative w-[300px] h-[210px] cursor-pointer group transition-all duration-900 ${phase === 'opening' ? '-translate-y-2.5' : ''}`}
            onClick={onOpen}
        >
            {/* Blooming sequence */}
            <AnimatePresence>
                {phase !== 'sealed' && displayFlowers.map((id, i) => {
                    const Flower = FLOWER_COMPONENTS[id]
                    if (!Flower) return null
                    const pos = BLOOM_POSITIONS[i % BLOOM_POSITIONS.length]

                    return (
                        <motion.div
                            key={`bloom-${id}-${i}`}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: pos.rotStart }}
                            animate={{
                                x: phase === 'open' ? pos.x * 1.5 : pos.x,
                                y: phase === 'open' ? pos.y * 1.5 + 200 : pos.y,
                                scale: phase === 'open' ? pos.scale * 1.2 : pos.scale,
                                opacity: phase === 'opening' ? 1 : 0,
                                rotate: pos.rotate + pos.rotVar
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 90,
                                damping: 10,
                                mass: 0.8,
                                delay: pos.delay,
                                opacity: { duration: phase === 'open' ? 0.6 : 0.4 }
                            }}
                            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        >
                            <Flower size={56} className="drop-shadow-2xl" />
                        </motion.div>
                    )
                })}
            </AnimatePresence>

            <div className="absolute inset-0 bg-[#3f2150] rounded-[2px_2px_4px_4px] border border-[#2b1638] shadow-[0_8px_32px_rgba(51,26,65,0.25)] z-10 transition-transform duration-700"
                style={{ transform: phase === 'opening' ? 'scale(0.98)' : 'scale(1)' }}>
                {/* Left flap */}
                <div className="absolute bottom-0 left-0 w-0 h-0 border-t-105 border-l-150 border-t-transparent border-l-purple-500" />
                {/* Right flap */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-105 border-l-150 border-b-transparent border-l-purple-500" />
                {/* Bottom flap */}
                <div className="absolute bottom-0 left-0 right-0 w-0 h-0 border-b-105 border-l-150 border-r-150 border-b-[#402151] border-l-transparent border-r-transparent mx-auto" />

                {/* Top flap */}
                <motion.div
                    className="absolute -top-px -left-px -right-px w-0 h-0 border-l-150 border-r-150 border-t-110 border-l-transparent border-r-transparent border-t-[#462458] origin-top z-10"
                    animate={{ rotateX: phase !== 'sealed' ? -170 : 0 }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                />

                {/* Wax seal */}
                {phase === 'sealed' && (
                    <motion.div
                        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[40%] z-20 w-[42px] h-[42px] rounded-full bg-green-300 border border-green-400 flex items-center justify-center shadow-[0_2px_12px_rgba(51,26,65,0.4)]"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Heart size={20} color="#FDFDF9" />
                    </motion.div>
                )}
            </div>

            {phase === 'sealed' && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-ui uppercase tracking-widest text-[0.65rem] font-medium text-purple-400 opacity-80 whitespace-nowrap">
                    tap to open
                </div>
            )}
        </div>
    )
}


