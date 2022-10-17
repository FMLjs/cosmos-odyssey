import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ReservationService} from 'src/reservation/domain/service/ReservationService';
import {CreateReservationInputDto} from '../dto/CreateReservationInputDto';
import {ReservationInputDto} from '../dto/ReservationInputDto';

@Resolver()
export class ReservationResolver {

    constructor(
        private readonly reservationService: ReservationService,
    ) { }

    @Mutation()
    createReservation(@Args('input') input: CreateReservationInputDto) {
        return this.reservationService.create(input);
    }

    @Query()
    reservation(@Args('input') input: ReservationInputDto) {
        return this.reservationService.findOneOrFail(input);
    }
}