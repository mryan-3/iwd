'use client'

import { useState } from 'react'

export function DownloadButton() {
    const [downloading, setDownloading] = useState(false)

    async function handleDownload() {
        const el = document.getElementById('letter-content')
        if (!el) return
        setDownloading(true)
        try {
            const html2canvas = (await import('html2canvas')).default
            const canvas = await html2canvas(el, {
                backgroundColor: '#FDFDF9',
                scale: 2,
                useCORS: true,
            })
            const link = document.createElement('a')
            link.download = 'iwd-letter.png'
            link.href = canvas.toDataURL('image/png')
            link.click()
        } catch (err) {
            console.error('Failed to download', err)
        } finally {
            setDownloading(false)
        }
    }

    return (
        <button
            onClick={handleDownload}
            disabled={downloading}
            className="font-ui text-sm font-bold text-purple-400 hover:text-purple-500 transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
            <span className="text-base">&#8681;</span>
            {downloading ? 'Saving...' : 'Download as image'}
        </button>
    )
}
