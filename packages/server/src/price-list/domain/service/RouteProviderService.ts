import {Injectable} from "@nestjs/common";
import {RouteProviderDAO} from "../dao/RouteProviderDAO";
import {RouteProvider} from "../entity/RouteProvider";

@Injectable()
export class RouteProviderService {
    constructor(
        private readonly routeProviderDao: RouteProviderDAO,
    ) { }

    findOneByIdOrFail(id: string) {
        return this.routeProviderDao.findOneByIdOrFail(id);
    }

    save(routeProvider: RouteProvider){
        return this.routeProviderDao.save(routeProvider);
    }
}