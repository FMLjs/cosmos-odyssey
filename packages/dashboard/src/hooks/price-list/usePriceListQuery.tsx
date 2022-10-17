import {useQuery} from "@apollo/client";
import {loader} from 'graphql.macro';

export function usePriceListQuery() {
    const query = loader('../../graphql/price-list/PriceList.query.graphql');
    console.log(query)
    const {data: {priceList = {}} = {}, ...others} = useQuery(query, {
        variables: {
            input: {
                origin: 'Earth',
                destination: 'Uranus'
            }
        }
    });
    console.log(priceList)
    return {
        data: priceList,
        ...others
    };
}
