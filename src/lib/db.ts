import { supabase } from './supabase'
import { nanoid } from 'nanoid'
import { LetterData } from './encode'

export async function saveLetter(data: LetterData): Promise<string> {
    const id = nanoid(10)

    const { error } = await supabase.from('letters').insert({
        id,
        sender: data.from,
        recipient: data.to,
        message: data.message,
        flowers: data.flowers,
        sign_off: data.signOff
    })

    if (error) {
        console.error("Error saving letter to Supabase:", error)
        throw new Error("Failed to save letter")
    }

    return id
}

export async function getLetter(id: string): Promise<LetterData | null> {
    const { data, error } = await supabase.from('letters').select('*').eq('id', id).single()

    if (error || !data) {
        console.error("Error fetching letter from Supabase:", error)
        return null
    }

    return {
        to: data.recipient,
        from: data.sender,
        message: data.message,
        flowers: data.flowers || [],
        signOff: data.sign_off
    }
}
