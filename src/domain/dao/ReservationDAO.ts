import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Reservation} from './../entity/Reservation';

@Injectable()
export class ReservationDAO {

    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
    ) {
    }

    save(routeProvider: Reservation){
        return this.reservationRepository.save(routeProvider);
    }

    findOneByIdOrFail(id: string){
        return this.reservationRepository.createQueryBuilder('reservation')
            .innerJoinAndSelect('reservation.routeProviders', 'routeProvider')
            .innerJoinAndSelect('routeProvider.route', 'route', 'route.id = routeProvider.route_id')
            .innerJoinAndSelect('routeProvider.provider', 'provider', 'provider.id = routeProvider.provider_id')
            .where('reservation.id = :id', {id})
            .getOneOrFail()
    }
}
