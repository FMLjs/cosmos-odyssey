import {Injectable} from "@nestjs/common";
import {CreateReservationInputDto} from "src/api/dto/CreateReservationInputDto";
import {ReservationInputDto} from "src/api/dto/ReservationInputDto";
import {IllegalDomainOperationError} from 'src/error/IllegalDomainOperationError';
import {InvalidArgumentError} from 'src/error/InvalidArgumentError';
import {EntityNotFoundError} from "typeorm";
import {PriceListDAO} from "../dao/PriceListDAO";
import {ReservationDAO} from "../dao/ReservationDAO";
import {RouteProviderDAO} from '../dao/RouteProviderDAO';
import {Reservation} from '../entity/Reservation';

@Injectable()
export class ReservationService {

    constructor(
        private readonly priceListDao: PriceListDAO,
        private readonly routeProviderDao: RouteProviderDAO,
        private readonly reservationDao: ReservationDAO
    ) { }

    async create(context: CreateReservationInputDto) {
        const {
            firstName,
            lastName,
            routeProviders
        } = context;

        const priceList = await this.priceListDao.findOneLatestOrFail();
        
        IllegalDomainOperationError.ifThrow(
            !priceList.isLatest(),
            'Price list is outdated, request a new one'
        );

        let existingRouteProviders;

        try {
            existingRouteProviders = await Promise.all(
                routeProviders.map(async ({providerId, routeId}) => {
                    return await this.routeProviderDao.findOneByOrderIdAndProviderIdOrFail(routeId, providerId);
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
