import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RouteProvider} from './../entity/RouteProvider';

@Injectable()
export class RouteProviderDAO {

    constructor(
        @InjectRepository(RouteProvider)
        private readonly routeProviderRepository: Repository<RouteProvider>,
    ) {
    }

    findOneByOrderIdAndProviderIdOrFail(orderId: string, providerId: string) {
        return this.routeProviderRepository.findOneOrFail({
            where: {
                route: {
                    id: orderId
                },
                provider: {
                    id: providerId
                }
            }
        })
    }

    save(routeProvider: RouteProvider){
        return this.routeProviderRepository.save(routeProvider);
    }
}
