'use client'

import { useState } from 'react'
import { LetterData } from '../lib/encode'
import { ScatteredHearts } from './hearts'
import { Sparkles } from './sparkles'
import { Envelope } from './envelope'
import { LetterPaper } from './letter-paper'
import { DownloadButton } from './download-button'
import { ShareButton } from './share-button'
import { motion, AnimatePresence } from 'framer-motion'
import { playSound } from '../lib/sound-engine'
import { bookFlip1Sound } from '../lib/book-flip1'

interface ViewLetterProps {
    data: LetterData
}

export function ViewLetter({ data }: ViewLetterProps) {
    const [phase, setPhase] = useState<'sealed' | 'opening' | 'open'>('sealed')

    function handleOpen() {
        if (phase !== 'sealed') return
        setPhase('opening')
        playSound(bookFlip1Sound.dataUri, { volume: 1.2 })
        setTimeout(() => { setPhase('open') }, 800)
    }

    return (
        <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center p-4 relative">
            <ScatteredHearts />
            <Sparkles />

            <div className="w-full max-w-3xl z-10 space-y-8 md:space-y-12">
                <div className="text-center space-y-2 md:space-y-3">
                    <span className="text-[0.65rem] md:text-[0.7rem] font-semibold text-green-400 uppercase tracking-[0.3em] font-ui before:content-[''] before:block before:w-4 before:h-px before:bg-green-300 before:mx-auto before:mb-2">For</span>
                    <h2 className="text-4xl md:text-5xl font-medium font-handwriting text-purple-600 leading-tight italic px-4">{data.to}</h2>
                </div>


                <div className="flex justify-center">
                    <AnimatePresence mode="wait">
                        {phase !== 'open' ? (
                            <motion.div key="envelope"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                            >
                                <Envelope phase={phase} onOpen={handleOpen} />
                            </motion.div>
                        ) : (
                            <motion.div key="letter"
                                initial={{ opacity: 0, y: 150, scale: 0.85, rotateX: 20 }}
                                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                transition={{
                                    type: "spring",
                                    damping: 14,
                                    stiffness: 90,
                                    mass: 0.8,
                                    delay: 0.1
                                }}
                                className="w-full space-y-8 relative z-20"
                                style={{ perspective: '1000px' }}
                            >
                                <LetterPaper data={data} />
                                <div className="flex justify-center items-center gap-8 pt-4">
                                    <DownloadButton />
                                    <div className="w-px h-4 bg-purple-200" />
                                    <ShareButton />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
