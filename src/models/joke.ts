export interface Joke {
    error: boolean
    category: string
    type: string
    setup: string
    delivery: string
    flags: Flags
    safe: boolean
    id: number
    lang: string
}

interface Flags {
    nsfw: boolean
    religious: boolean
    political: boolean
    racist: boolean
    sexist: boolean
    explicit: boolean
}
