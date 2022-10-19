import {IRouteProvider} from "./IRouteProvider"

export interface IPriceList {
    id: string
    validUntil: Date
    routeProviders: IRouteProvider[]
}