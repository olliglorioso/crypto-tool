// This has all types used in the backend.
export interface HighestVolume {
    date: string,
    volume: string
}

export interface TimeMachine { buy: string, sell: string }

export interface DateWithValue { date: Date, value: number}

export interface All {
    downwardDays: number,
    highestVolume: HighestVolume
    timeMachine: TimeMachine
}

export interface CoingeckoResponse {
    prices: Array<[number, number]>
    market_caps: Array<[number, number]>
    total_volumes: Array<[number, number]>
}