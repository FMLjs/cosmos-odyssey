import {IRouteProvider} from "./IRouteProvider"

export interface IReservation {
    id: string
    totalPrice: string
    totalTravelTime: number
    firstName: string
    lastName: string
    priceListId: string
    routeProviders: IRouteProvider[]
}