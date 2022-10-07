import {EntityRepository, Repository} from "typeorm";
import {PriceList} from "../entity/PriceList";

@EntityRepository(PriceList)
export class PriceListRepository extends Repository<PriceList> {
}
