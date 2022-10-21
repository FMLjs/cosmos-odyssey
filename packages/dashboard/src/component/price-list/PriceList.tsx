import React, {useEffect, useState} from 'react';
import {usePriceListLazyQuery} from '../../hooks/price-list/usePriceListLazyQuery';
import {IPriceListInput} from '../../types/IPriceListInput';
import {IRouteProvider} from '../../types/IRouteProvider';
import {takeGqlErrorMessage} from '../../utils/takeGqlErrorMessage';
import {Loader} from '../ui-kit/Loader';
import {Error} from '../ui-kit/Error';
import {PriceListForm} from './PriceListForm';
import {RouteProvider} from './RouteProvider';
import {FormattedDate} from '../ui-kit/FormattedDate';
import {IPriceList} from '../../types/IPriceList';

interface Props {
    addRouteProvider: (routeProvider: IRouteProvider) => void,
    currentPriceList: IPriceList | undefined,
    setCurrentPriceList: (priceList: IPriceList | undefined) => void,
};

export const PriceList: React.FC<Props> = (props) => {
    const {
        addRouteProvider,
        currentPriceList,
        setCurrentPriceList
    } = props;

    const {load, payload: {loading, error}} = usePriceListLazyQuery({
        setCurrentPriceList
    });
    const [searchRequest, setSearchRequest] = useState<IPriceListInput>();

    useEffect(() => {
        if (searchRequest?.origin && searchRequest?.destination) {
            load(searchRequest);
        }
    }, [searchRequest]);

    const showComponent = () => {
        if (loading) {
            return <Loader loading={loading} />
        }

        if (error) {
            return <Error message={takeGqlErrorMessage(error)}/>
        }

        if (!currentPriceList) {
            return <span className='empty-message'>Request a price list by filling out the form</span>
        }

        return <>
            <div className='empty-message'>
                <p>
                    <span>The price list will expire on </span>
                    <FormattedDate isTimeVisible={true}>{currentPriceList.validUntil}</FormattedDate>
                </p>
                <p>
                    After that, all the routes you have chosen will be reset to zero.
                </p>
            </div>
            {currentPriceList.routeProviders.map((routeProvider, i) => (
                <RouteProvider routeProvider={routeProvider}
                               mode='add'
                               key={routeProvider.id + i}
                               handleButtonClick={() => addRouteProvider(routeProvider)} />
            ))}
        </>
    }

    return (
        <div className='container price-list'>
            <PriceListForm setSearchRequest={setSearchRequest}/>
            {showComponent()}
        </div>
    );
}