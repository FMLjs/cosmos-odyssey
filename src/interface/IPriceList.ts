import {IRoute} from "./IRoute"

export interface IPriceList {
    id: string
    validUntil: Date
    legs: [IRoute]
}