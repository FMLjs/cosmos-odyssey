import {useLazyQuery} from "@apollo/client";
import Q from '../../graphql/price-list/PriceList.query.graphql';
import {IPriceList} from "../../types/IPriceList";
import {IPriceListInput} from "../../types/IPriceListInput";

interface IContext {
    setCurrentPriceList: (priceList: IPriceList) => void
}

export function usePriceListLazyQuery(context: IContext) {
    const {
        setCurrentPriceList
    } = context;
    
    const [execute, payload] = useLazyQuery<{priceList: IPriceList}>(Q, {
        onCompleted: (data) => setCurrentPriceList(data.priceList)
    });
    
    return {
        load: (input: IPriceListInput) => execute({variables: {input}}),
        payload
    }
}
