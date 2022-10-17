import {Injectable} from "@nestjs/common";
import {CreateReservationInputDto} from "src/api/dto/CreateReservationInputDto";
import {ReservationInputDto} from "src/api/dto/ReservationInputDto";
import {IllegalDomainOperationError} from 'src/error/IllegalDomainOperationError';
import {InvalidArgumentError} from 'src/error/InvalidArgumentError';
import {RouteProviderDAO} from "src/price-list/domain/dao/RouteProviderDAO";
import {PriceListService} from "src/price-list/domain/service/PriceListService";
import {RouteProviderService} from "src/price-list/domain/service/RouteProviderService";
import {EntityNotFoundError} from "typeorm";
import {ReservationDAO} from "../dao/ReservationDAO";
import {Reservation} from '../entity/Reservation';

@Injectable()
export class ReservationService {

    constructor(
        private readonly priceListService: PriceListService,
        private readonly routeProviderService: RouteProviderService,
        private readonly reservationDao: ReservationDAO
    ) { }

    async create(context: CreateReservationInputDto) {
        const {
            firstName,
            lastName,
            routeProviders
        } = context;

        const priceList = await this.priceListService.findOneLatestOrFail();
        
        IllegalDomainOperationError.ifThrow(
            !priceList.isLatest(),
            'Price list is outdated, request a new one'
        );

        let existingRouteProviders;

        try {
            existingRouteProviders = await Promise.all(
                routeProviders.map(async ({providerId, routeId}) => {
                    return await this.routeProviderService.findOneByOrderIdAndProviderIdOrFail(routeId, providerId);
                })
            );
        } catch (e) {
            InvalidArgumentError.ifThrow(
                e instanceof EntityNotFoundError,
                `Route providers for input ${JSON.stringify(routeProviders)} not found`
            );
        }
        
        const reservation = Reservation.create({
            firstName,
            lastName,
            priceListId: priceList.id
        });

        existingRouteProviders?.forEach(routeProvider => reservation.addRouteProvider(routeProvider));

        await this.reservationDao.save(reservation);
        
        return reservation;
    }

    async findOneOrFail(context: ReservationInputDto) {
        try {
            return await this.reservationDao.findOneByIdOrFail(context.reservationId);
        } catch (e) {
            InvalidArgumentError.ifThrow(
                e instanceof EntityNotFoundError,
                `Reservation for input ${JSON.stringify(context)} not found`
            );
        }
    }
}
