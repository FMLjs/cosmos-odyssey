import {Provider} from "./Provider"
import {RouteInfo} from "./RouteInfo"

export interface Route {
    id: string
    routeInfo: RouteInfo
    providers: [Provider]
}