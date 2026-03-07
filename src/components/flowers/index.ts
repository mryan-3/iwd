import { Rose } from './rose'
import { Daisy } from './daisy'
import { Sunflower } from './sunflower'
import { Tulip } from './tulip'
import { Lavender } from './lavender'
import { Peony } from './peony'

export const FLOWERS = [
    { id: 'rose', label: '🌹 Rose', emoji: '🌹' },
    { id: 'daisy', label: '🌸 Blossom', emoji: '🌸' },
    { id: 'sunflower', label: '🌻 Sunflower', emoji: '🌻' },
    { id: 'tulip', label: '🌷 Tulip', emoji: '🌷' },
    { id: 'lavender', label: '💜 Lavender', emoji: '💜' },
    { id: 'peony', label: '🌺 Peony', emoji: '🌺' },
] as const

export const FLOWER_COMPONENTS: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
    rose: Rose,
    daisy: Daisy,
    sunflower: Sunflower,
    tulip: Tulip,
    lavender: Lavender,
    peony: Peony,
}
