import {Provider} from "../entity/Provider";
import {Route} from "../entity/Route";

export class RouteProviderDto {
    routeProvider: {
        route: Route;
        provider: Provider;
    }
}