import {Body, Controller, Get} from '@nestjs/common';
import {PriceListInputDto} from 'src/api/dto/PriceListInputDto';
import {PriceListService} from 'src/domain/service/PriceListService';

@Controller()
export class PriceListController {
    
    constructor(
        private readonly priceListService: PriceListService,
    ) { }

    @Get('/price-list')
    priceList(@Body() input: PriceListInputDto) {
        return this.priceListService.findLatest(input);
    }
}
