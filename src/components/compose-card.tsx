'use client'

import { useState } from 'react'
import { LetterData } from '../lib/encode'
import { saveLetter } from '../lib/db'
import { FlowerPicker } from './flower-picker'
import { LinkResult } from './link-result'

export function ComposeCard() {
    const [to, setTo] = useState('')
    const [from, setFrom] = useState('')
    const [message, setMessage] = useState('')
    const [signOff, setSignOff] = useState('With deepest appreciation')
    const [selectedFlowers, setSelectedFlowers] = useState<string[]>([])
    const [generatedLink, setGeneratedLink] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    function toggleFlower(id: string) {
        setSelectedFlowers(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : prev.length < 4 ? [...prev, id] : prev
        )
    }

    async function handleGenerate() {
        setIsGenerating(true)
        const data: LetterData = {
            to: to.trim() || 'You',
            from: from.trim() || 'Someone Special',
            message: message.trim(),
            flowers: selectedFlowers.length > 0 ? selectedFlowers : ['rose', 'daisy'],
            signOff: signOff,
        }

        try {
            const id = await saveLetter(data)
            const base = window.location.origin + window.location.pathname
            setGeneratedLink(`${base}?id=${id}`)
        } catch (err) {
            console.error(err)
            alert("Failed to create the letter. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    if (generatedLink) {
        return <LinkResult url={generatedLink} onReset={() => { setGeneratedLink(null); setMessage(''); setSelectedFlowers([]) }} />
    }

    return (
        <ComposeForm to={to} from={from} message={message} signOff={signOff} selectedFlowers={selectedFlowers}
            setTo={setTo} setFrom={setFrom} setMessage={setMessage} setSignOff={setSignOff} isGenerating={isGenerating}
            toggleFlower={toggleFlower} handleGenerate={handleGenerate} />
    )
}

interface FormProps {
    to: string; from: string; message: string; signOff: string; selectedFlowers: string[]; isGenerating: boolean
    setTo: (v: string) => void; setFrom: (v: string) => void; setMessage: (v: string) => void; setSignOff: (v: string) => void
    toggleFlower: (id: string) => void; handleGenerate: () => void
}

function ComposeForm({ to, from, message, signOff, selectedFlowers, isGenerating, setTo, setFrom, setMessage, setSignOff, toggleFlower, handleGenerate }: FormProps) {
    return (
        <div className="bg-white rounded-2xl pt-8 pb-8 shadow-[0_8px_32px_rgba(75,39,95,0.06)] border border-purple-100 flex flex-col gap-8 w-full overflow-hidden">
            <div className="px-6 md:px-10 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-5">
                    <FieldInput label="To" placeholder="Mum, sister, wife, friend..." value={to} onChange={setTo} />
                    <FieldInput label="From" placeholder="Your name" value={from} onChange={setFrom} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[0.8rem] font-semibold text-purple-500 uppercase tracking-widest font-ui">Sign-off</label>
                    <select
                        className="bg-warm-white border border-purple-100 rounded-xl px-5 py-3 font-handwriting text-[1.4rem] text-purple-600 outline-none transition-all focus:border-green-300 focus:shadow-[0_0_0_3px_rgba(93,122,97,0.08)] cursor-pointer appearance-none"
                        value={signOff} onChange={e => setSignOff(e.target.value)}
                    >
                        <option value="With deepest appreciation">With deepest appreciation</option>
                        <option value="With love">With love</option>
                        <option value="Yours truly">Yours truly</option>
                        <option value="Warmly">Warmly</option>
                        <option value="Best wishes">Best wishes</option>
                        <option value="Thinking of you">Thinking of you</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[0.8rem] font-semibold text-purple-500 uppercase tracking-widest font-ui">Your message</label>
                    <textarea
                        className="bg-warm-white border border-purple-100 rounded-xl px-5 py-4 font-handwriting text-[1.4rem] text-purple-600 outline-none transition-all focus:border-green-300 focus:shadow-[0_0_0_3px_rgba(93,122,97,0.08)] placeholder:text-purple-300 placeholder:italic resize-none min-h-[160px] leading-relaxed"
                        placeholder="Write from the heart..."
                        value={message} onChange={e => setMessage(e.target.value)} rows={6}
                    />
                </div>
            </div>

            <div className="px-6 md:px-10 pt-2 border-t border-purple-50">
                <FlowerPicker selectedFlowers={selectedFlowers} onToggle={toggleFlower} />
            </div>

            <div className="px-6 md:px-10 mt-2">
                <button
                    className="w-full bg-purple-500 text-white rounded-full py-4 px-8 font-ui text-[1.05rem] font-semibold transition-all shadow-[0_4px_16px_rgba(75,39,95,0.2)] flex items-center justify-center gap-3 hover:bg-purple-600 hover:shadow-[0_6px_20px_rgba(75,39,95,0.3)] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] tracking-widest uppercase"
                    onClick={handleGenerate} disabled={!message.trim() || isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sealing...
                        </>
                    ) : (
                        <>
                            <span className="text-xl opacity-80">&#9993;</span>
                            Seal & Generate Link
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

function FieldInput({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
    return (
        <div className="flex flex-col gap-2 flex-1 min-w-0">
            <label className="text-[0.8rem] font-semibold text-purple-500 uppercase tracking-widest font-ui">{label}</label>
            <input
                className="bg-warm-white border border-purple-100 rounded-xl px-5 py-3 font-handwriting text-[1.4rem] text-purple-600 outline-none transition-all focus:border-green-300 focus:shadow-[0_0_0_3px_rgba(93,122,97,0.08)] placeholder:text-purple-300 placeholder:italic w-full truncate"
                placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}

