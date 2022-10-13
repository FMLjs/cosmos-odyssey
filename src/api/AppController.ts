import { CreateReservationInputDto } from './dto/CreateReservationInputDto';
import { ReservationService } from './../domain/service/ReservationService';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {PriceListInputDto} from 'src/api/dto/PriceListInputDto';
import {PriceListService} from 'src/domain/service/PriceListService';
import {ReservationInputDto} from './dto/ReservationInputDto';

@Controller()
export class AppController {
    
    constructor(
        private readonly priceListService: PriceListService,
        private readonly reservationService: ReservationService,
    ) { }

    @Get('/price-list')
    priceList(@Body() input: PriceListInputDto) {
        return this.priceListService.findLatest(input);
    }

    @Post('/reservation')
    createReservation(@Body() input: CreateReservationInputDto) {
        return this.reservationService.create(input);
    }

    @Get('/reservation')
    reservation(@Body() input: ReservationInputDto) {
        return this.reservationService.findOneOrFail(input);
    }
}
