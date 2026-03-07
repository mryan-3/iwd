'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

interface LinkResultProps {
    url: string
    onReset: () => void
}

export function LinkResult({ url, onReset }: LinkResultProps) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(75,39,95,0.06)] border border-purple-100 flex flex-col gap-6 items-center">
            <div className="text-center space-y-2">
                <div className="font-handwriting text-3xl text-purple-600 font-semibold tracking-tight">Your letter is sealed</div>
                <p className="text-[0.85rem] text-green-400 font-ui italic">Share the link or download as an image.</p>
            </div>

            <div className="flex gap-3 w-full max-w-sm">
                <input readOnly value={url}
                    className="flex-1 bg-warm-white border border-purple-100 rounded-xl px-4 py-3 text-[0.8rem] text-purple-600 font-ui focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:border-purple-200 transition-colors"
                    onClick={e => (e.target as HTMLInputElement).select()}
                />
                <button onClick={handleCopy}
                    className={clsx(
                        "bg-purple-500 hover:bg-purple-600 text-white border-none rounded-xl px-5 py-3 font-ui font-medium text-[0.85rem] cursor-pointer transition-colors whitespace-nowrap shadow-sm tracking-wide",
                        copied && "bg-green-400 hover:bg-green-500"
                    )}
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>

            <div className="flex w-full max-w-sm items-center justify-between pt-2">
                <a href={url} target="_blank" rel="noreferrer"
                    className="font-handwriting text-xl text-purple-500 hover:text-purple-600 transition-colors italic">
                    Preview your letter &rarr;
                </a>
                <button onClick={onReset}
                    className="text-[0.8rem] text-purple-400 cursor-pointer font-ui transition-all hover:text-purple-600 uppercase tracking-widest font-medium">
                    Write another
                </button>
            </div>
        </div>
    )
}

