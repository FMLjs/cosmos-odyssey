import {ForbiddenException, HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PriceListInputDto} from "src/api/dto/PriceListInputDto";
import {InvalidArgumentError} from "src/error/InvalidArgumentError";
import {TravelService} from "src/service/TravelService";
import {EntityNotFoundError, Repository} from 'typeorm';
import {PriceListDAO} from "../dao/PriceListDAO";
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
        private readonly priceListDao: PriceListDAO,
    ) { }

    async findLatest(context: PriceListInputDto) {
        let priceList;

        try {
            priceList = await this.priceListDao.findOneLatestOrFail();

            if (!priceList.isLatest()) {
                throw new Error('Price list is outdated');
            }
        } catch (e) {
            const newPriceList = await this.travelService.getPriceList();

            priceList = await this.create({response: newPriceList});
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
