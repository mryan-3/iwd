export interface LetterData {
    to: string
    from: string
    message: string
    flowers: string[]
    signOff?: string
}

export function encodeLetter(data: LetterData): string {
    try {
        const json = JSON.stringify(data)
        return btoa(encodeURIComponent(json))
    } catch (err) {
        console.error('Failed to encode letter', err)
        return ''
    }
}

export function decodeLetter(encoded: string): LetterData | null {
    try {
        const json = decodeURIComponent(atob(encoded))
        return JSON.parse(json)
    } catch (err) {
        console.error('Failed to decode letter', err)
        return null
    }
}

export function generateLink(data: LetterData): string {
    const encoded = encodeLetter(data)
    if (typeof window === 'undefined') return ''
    const base = window.location.origin + window.location.pathname
    return `${base}#letter=${encoded}`
}

