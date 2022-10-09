import {Body, Controller, Get} from '@nestjs/common';
import {PriceListInputDto} from 'src/api/dto/PriceListInputDto';
import {PriceListService} from 'src/domain/service/PriceListService';

@Controller()
export class AppController {
    
    constructor(
        private readonly priceListService: PriceListService

    ) { }

    @Get('/price-list')
    async priceList(@Body() input: PriceListInputDto) {
        try {
            return this.priceListService.findLatest(input);
        } catch (e) {
            throw e
        }
    }
}
