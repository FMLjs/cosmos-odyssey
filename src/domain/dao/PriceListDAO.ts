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
            .select()
            .leftJoinAndMapMany('price_list.routes', 'route', 'route', 'route.price_list_id = price_list.id')
            .leftJoinAndMapMany('route.providers', 'provider', 'provider', 'provider.route_id = route.id')
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
            .select()
            .orderBy('price_list.created_at', 'DESC')
            .getOneOrFail();
    }
}
