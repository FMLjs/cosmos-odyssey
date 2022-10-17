import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PriceListInputDto} from "src/api/dto/PriceListInputDto";
import {QueryUtils} from "src/utils/QueryUtils";
import {Repository} from "typeorm";
import {PriceList} from "../entity/PriceList";

@Injectable()
export class PriceListDAO {

    constructor(
        @InjectRepository(PriceList)
        private readonly priceListRepository: Repository<PriceList>,
    ) {
    }

    findOneByIdWithFilterOrFail(id: string, context: PriceListInputDto) {
        const {destination: to, origin: from, filter} = context;
        const {companyName, sort} = filter || {};
        const {field, direction} = sort || {};
        
        const query = this.priceListRepository.createQueryBuilder('price_list')
            .innerJoinAndSelect('price_list.routeProviders', 'routeProvider')
            .innerJoinAndSelect('routeProvider.route', 'route', 'route.id = routeProvider.route_id')
            .innerJoinAndSelect('routeProvider.provider', 'provider', 'provider.id = routeProvider.provider_id')
            .where('price_list.id = :id', {id})
            .andWhere('route.from = :from and route.to = :to', {from, to})
            .orderBy('price_list.created_at', 'DESC');

        if(!!companyName) {
            query.andWhere('provider.company_name = :companyName', {companyName});
        }

        if (!!field) {
            query.addOrderBy(QueryUtils.toSnakeCase(field), direction);
        }

        return query.getOneOrFail();
    }

    findOneLatestOrFail() {
        return this.priceListRepository.createQueryBuilder('price_list')
            .orderBy('price_list.created_at', 'DESC')
            .getOneOrFail();
    }

    save(priceList: PriceList){
        return this.priceListRepository.save(priceList);
    }
}
