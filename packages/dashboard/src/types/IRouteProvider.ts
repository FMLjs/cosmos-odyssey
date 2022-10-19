import {IProvider} from "./IProvider"
import {IRoute} from "./IRoute"

export interface IRouteProvider {
    id: string
    route: IRoute
    provider: IProvider
}