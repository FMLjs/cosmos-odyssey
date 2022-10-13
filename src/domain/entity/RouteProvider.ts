import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {v4 as generateUuid} from "uuid";
import {RouteProviderDto} from "../dto/RouteProviderDto";
import {PriceList} from "./PriceList";
import {Provider} from "./Provider";
import {Reservation} from './Reservation';
import {Route} from "./Route";

@Entity()
export class RouteProvider {

    @PrimaryColumn()
    id: string = generateUuid();
    
    @ManyToOne(() => Route, route => route.routeProviders, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: 'route_id'})
    route: Route;

    @ManyToOne(() => Provider, provider => provider.routeProviders, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: 'provider_id'})
    provider: Provider;

    @ManyToOne(() => PriceList, (priceList) => priceList.routeProviders)
    @JoinColumn({name: 'price_list_id'})
    priceList: PriceList;

    reservations: Reservation[];

    static create(context: RouteProviderDto) {
        const {
            routeProvider: {
                route,
                provider
            }
        } = context;

        const routeProvider = new RouteProvider();

        routeProvider.provider = provider;
        routeProvider.route = route;

        return routeProvider;
    }
}