import {Company} from "./Company"

export interface Provider {
    id: string
    company: Company
    price: number
    flighStart: Date
    flightEnd: Date
}