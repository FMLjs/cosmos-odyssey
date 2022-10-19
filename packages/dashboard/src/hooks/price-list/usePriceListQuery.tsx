import {useLazyQuery} from "@apollo/client";
import Q from '../../graphql/price-list/PriceList.query.graphql';
import {IFilter} from "../../types/IFilter";
import {IPriceList} from "../../types/IPriceList";

type PriceListInput = {
    origin: string,
    destination: string,
    filter?: IFilter
}

export function usePriceListQuery() {
    const [execute, {data, ...others}] = useLazyQuery(Q);
    
    return {
        load: (input: PriceListInput) => execute({variables: {input}}),
        payload: {
            data: data?.priceList as IPriceList,
            ...others
        }
    }
}
