import {Controller, Get} from '@nestjs/common';
import {PriceList} from 'src/interface/PriceList';
import {TravelService} from 'src/service/TravelService';

@Controller()
export class AppController {
    
    constructor(
        private readonly travelService: TravelService
    ) { }

    @Get('/price-list')
    priceList(): Promise<PriceList> {
        try {
            return this.travelService.getPriceList();
        } catch (e) {
            throw e
        }
    }
}
