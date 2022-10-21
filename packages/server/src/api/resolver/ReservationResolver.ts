import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ReservationService} from 'src/reservation/domain/service/ReservationService';
import {CreateReservationInputDto} from '../dto/CreateReservationInputDto';
import {ReservationsInputDto} from '../dto/ReservationsInputDto';

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
    reservations(@Args('input') input: ReservationsInputDto) {
        return this.reservationService.findByfirstNameAndLastName(input);
    }
}