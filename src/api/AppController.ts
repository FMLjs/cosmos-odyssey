import {Body, Controller, Get} from '@nestjs/common';
import {PriceList} from 'src/interface/PriceList';
import {PriceListInputDto} from 'src/api/dto/PriceListInputDto';
import {TravelService} from 'src/service/TravelService';

@Controller()
export class AppController {
    
    constructor(
        private readonly travelService: TravelService
    ) { }

    @Get('/price-list')
    priceList(@Body() input: PriceListInputDto) {
        console.log(input)
        try {
            return this.travelService.getPriceList();
        } catch (e) {
            throw e
        }
    }
}
