import { FLOWERS, FLOWER_COMPONENTS } from './flowers'
import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'

interface FlowerPickerProps {
    selectedFlowers: string[]
    onToggle: (id: string) => void
}

export function FlowerPicker({ selectedFlowers, onToggle }: FlowerPickerProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
                <label className="block text-[0.8rem] font-semibold text-purple-500 uppercase tracking-widest font-ui">
                    Build your bouquet
                </label>
                <span className="text-xs text-green-400 font-ui italic">up to 4</span>
            </div>

            {/* Dynamic Preview Canvas */}
            <div className="bg-[#fcfaf7] rounded-xl p-4 flex items-center justify-center gap-6 border border-purple-100 min-h-[90px] shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4B275F 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <AnimatePresence mode="popLayout">
                    {selectedFlowers.length === 0 ? (
                        <motion.span
                            key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-purple-300 font-handwriting text-xl italic"
                        >
                            Select flowers below...
                        </motion.span>
                    ) : (
                        selectedFlowers.map((id) => {
                            const Flower = FLOWER_COMPONENTS[id]
                            return (
                                <motion.div
                                    layout key={id}
                                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="relative z-10"
                                    onClick={() => onToggle(id)}
                                >
                                    <button className="cursor-pointer hover:scale-110 transition-transform hover:drop-shadow-md">
                                        <Flower size={42} className="drop-shadow-sm" />
                                    </button>
                                </motion.div>
                            )
                        })
                    )}
                </AnimatePresence>
            </div>

            {/* Horizontal Scroll Tray (Mobile Perfect) */}
            <div className="flex sm:justify-center gap-3 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pointer-events-auto px-1">
                {FLOWERS.map(f => {
                    const Flower = FLOWER_COMPONENTS[f.id]
                    const selected = selectedFlowers.includes(f.id)
                    return (
                        <button key={f.id} type="button"
                            className={clsx(
                                "snap-start flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer transition-all duration-300 min-w-[80px] border shadow-sm",
                                selected
                                    ? "bg-purple-50 border-purple-300 shadow-[0_2px_8px_rgba(75,39,95,0.12)] scale-[0.98] ring-1 ring-purple-200 ring-offset-1"
                                    : "bg-white border-purple-50 hover:border-green-200 hover:bg-green-50 hover:-translate-y-1"
                            )}
                            onClick={() => onToggle(f.id)} title={f.label}
                        >
                            <Flower size={32} className={clsx("transition-transform", selected ? "opacity-100 scale-110" : "opacity-80")} />
                            <span className="text-[0.65rem] text-purple-600 font-ui font-medium uppercase tracking-wider">
                                {f.label.split(' ').slice(1).join(' ')}
                            </span>
                        </button>
                    )
                })}
                {/* Spacer block to allow last item to scroll fully into view */}
                <div className="min-w-[4px] shrink-0 blur-none opacity-0" aria-hidden="true">-</div>
            </div>
        </div>
    )
}


