import {Body, Controller, Get, Post} from '@nestjs/common';
import {ReservationService} from './../domain/service/ReservationService';
import {CreateReservationInputDto} from './dto/CreateReservationInputDto';
import {ReservationInputDto} from './dto/ReservationInputDto';

@Controller()
export class ReservationController {
    
    constructor(
        private readonly reservationService: ReservationService,
    ) { }

    @Post('/reservation')
    createReservation(@Body() input: CreateReservationInputDto) {
        return this.reservationService.create(input);
    }

    @Get('/reservation')
    reservation(@Body() input: ReservationInputDto) {
        return this.reservationService.findOneOrFail(input);
    }
}
