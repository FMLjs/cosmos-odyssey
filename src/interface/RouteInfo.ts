import {Planet} from "./Planet"

export interface RouteInfo {
    id: string
    from: Planet
    to: Planet
    distance: number
}