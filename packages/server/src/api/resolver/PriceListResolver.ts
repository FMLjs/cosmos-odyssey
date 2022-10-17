import {Args, Query, Resolver} from '@nestjs/graphql';
import {PriceListService} from 'src/price-list/domain/service/PriceListService';
import {PriceListInputDto} from '../dto/PriceListInputDto';

@Resolver()
export class PriceListResolver {

    constructor(
        private readonly priceListService: PriceListService,
    ) { }

    @Query()
    priceList(@Args('input') input: PriceListInputDto) {
        return this.priceListService.findLatest(input);
    }
}