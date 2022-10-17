import {RouteProviderDAO} from "../dao/RouteProviderDAO";
import {RouteProvider} from "../entity/RouteProvider";

export class RouteProviderService {
    constructor(
        private readonly routeProviderDao: RouteProviderDAO,
    ) { }

    findOneByOrderIdAndProviderIdOrFail(orderId: string, providerId: string) {
        return this.routeProviderDao.findOneByOrderIdAndProviderIdOrFail(orderId, providerId);
    }

    save(routeProvider: RouteProvider){
        return this.routeProviderDao.save(routeProvider);
    }
}