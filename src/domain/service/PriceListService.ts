import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PriceListInputDto} from "src/api/dto/PriceListInputDto";
import {TravelService} from "src/service/TravelService";
import {Repository} from 'typeorm';
import {PriceListDto} from "../dto/PriceListDto";
import {PriceList} from "../entity/PriceList";
import {SourceRequestService} from './SourceRequestService';

@Injectable()
export class PriceListService {

    constructor(
        @InjectRepository(PriceList)
        private readonly priceListRepository: Repository<PriceList>,
        private readonly sourceRequestService: SourceRequestService,
        private readonly travelService: TravelService,
    ) { }

    async findLatest(context: PriceListInputDto){
        let priceList;

        try {
            priceList = await this.priceListRepository.findOneOrFail({
                order: {createdAt: 'DESC'}
            });

            if(!priceList.isActual()) {
                throw new Error('Price list is outdated');
            }

        } catch (e) {
            const newPriceList = await this.travelService.getPriceList();
            
            priceList = await this.create({response: newPriceList});
        }

        return priceList;
    }

    private async create(context: PriceListDto) {
        const {
            response
        } = context;
        
        const priceList = PriceList.create(context);
        
        response.legs.forEach(({routeInfo, providers}) => {
            const addedRoute = priceList.addRoute({
                from: routeInfo.from.name,
                to: routeInfo.to.name,
                distance: routeInfo.distance
            });

            providers.forEach(provider => {
                addedRoute.addProvider({
                    companyName: provider.company.name,
                    flightStart: provider.flightStart,
                    flightEnd: provider.flightEnd,
                    price: provider.price
                });
            })
        })

        await Promise.all([
            this.priceListRepository.save(priceList),
            this.sourceRequestService.create({
                response,
                sourceId: priceList.id
            })
        ]);

        return priceList;
    }
}
