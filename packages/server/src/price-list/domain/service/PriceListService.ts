import {Injectable} from "@nestjs/common";
import {PriceListInputDto} from "src/api/dto/PriceListInputDto";
import {IllegalDomainOperationError} from "src/error/IllegalDomainOperationError";
import {InvalidArgumentError} from "src/error/InvalidArgumentError";
import {TravelService} from "src/travel/service/TravelService";
import {SourceRequestService} from "src/source-request/domain/service/SourceRequestService";
import {EntityNotFoundError} from 'typeorm';
import {PriceListDAO} from "../dao/PriceListDAO";
import {PriceList} from "../entity/PriceList";
import {Provider} from "../entity/Provider";
import {Route} from "../entity/Route";

@Injectable()
export class PriceListService {

    constructor(
        private readonly sourceRequestService: SourceRequestService,
        private readonly travelService: TravelService,
        private readonly priceListDao: PriceListDAO,
    ) { }

    async findLatest(context: PriceListInputDto) {
        let priceList;

        try {
            priceList = await this.findOneLatestOrFail();

            IllegalDomainOperationError.ifThrow(
                !priceList.isLatest(),
                'Price list is outdated'
            );
        } catch (e) {
            priceList = await this.create();
        }

        try {
            priceList = await this.priceListDao.findOneByIdWithFilterOrFail(priceList.id, context);
        } catch (e) {
            InvalidArgumentError.ifThrow(
                e instanceof EntityNotFoundError,
                `Price list for input ${JSON.stringify(context)} not found`
            );
        }

        return priceList;
    }

    async create() {
        const response = await this.travelService.getPriceList();

        const priceList = PriceList.create({response});
        
        response.legs.forEach(({routeInfo, providers}) => {
            const route = Route.create({
                from: routeInfo.from.name,
                to: routeInfo.to.name,
                distance: routeInfo.distance
            });

            providers.forEach(provider => {
                const createdProvider = Provider.create({
                    companyName: provider.company.name,
                    flightStart: provider.flightStart,
                    flightEnd: provider.flightEnd,
                    price: provider.price
                });

                priceList.addRouteProvider({
                    routeProvider: {
                        route,
                        provider: createdProvider
                    }
                });
            })
        })

        await Promise.all([
            this.priceListDao.save(priceList),
            this.sourceRequestService.create({
                response,
                sourceId: priceList.id
            })
        ]);

        return priceList;
    }

    findOneLatestOrFail() {
        return this.priceListDao.findOneLatestOrFail();
    }
}
