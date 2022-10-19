import {IProvider} from "./IProvider"
import {IRouteInfo} from "./IRouteInfo"

export interface IRoute {
    id: string
    routeInfo: IRouteInfo
    providers: IProvider[]
}