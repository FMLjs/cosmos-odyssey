import {Route} from "./Route"

export interface PriceList {
    id: string
    validUntil: Date
    routes: [Route]
}