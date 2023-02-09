import { nanoid } from 'nanoid'

interface Options {
    size?: 'default' | 'long' | 'tiny' | 'extraTiny'
}

const SIZES_TO_LENGTH = {
    long: 17,
    default: 11,
    tiny: 7,
    extraTiny: 5,
}

export default function generateUniqueId<T extends string>(options: Options = {}): T {
    const { size = 'default' } = options
    return nanoid(SIZES_TO_LENGTH[size]) as T
}
