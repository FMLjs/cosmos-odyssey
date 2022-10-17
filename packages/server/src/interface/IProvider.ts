import {ICompany} from "./ICompany"

export interface IProvider {
    id: string
    company: ICompany
    price: number
    flightStart: Date
    flightEnd: Date
}