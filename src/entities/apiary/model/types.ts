export interface Apiary {
    id: number
    name: string
    coordinates: [number, number] // [latitude, longitude]
    description: string
    area: string
    honeyTypes: string[]
}
