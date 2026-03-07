'use client'

import { useState } from 'react'

export function ShareButton() {
    const [sharing, setSharing] = useState(false)

    async function handleShare() {
        if (!navigator.share) {
            // Fallback to copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href)
                alert("Link copied to clipboard!")
            } catch (err) {
                console.error("Failed to copy", err)
            }
            return
        }

        setSharing(true)
        try {
            await navigator.share({
                title: "A letter for you",
                text: "Someone special sent you a custom letter for International Women's Day.",
                url: window.location.href,
            })
        } catch (err) {
            // AbortError is common if the user cancels the share sheet
            if ((err as Error).name !== 'AbortError') {
                console.error('Failed to share', err)
            }
        } finally {
            setSharing(false)
        }
    }

    return (
        <button
            onClick={handleShare}
            disabled={sharing}
            className="font-ui text-sm font-bold text-green-500 hover:text-green-600 transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
            <span className="text-base">&#10148;</span>
            {sharing ? 'Sharing...' : 'Share link'}
        </button>
    )
}
