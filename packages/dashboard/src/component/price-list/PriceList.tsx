import React from 'react';
import {IPriceList} from '../../types/IPriceList';
import {RouteProvider} from './RouteProvider';

interface Props {
    priceList: IPriceList;
};

export const PriceList: React.FC<Props> = (props) => {
    const {
        priceList
    } = props;
    
    return (
        <div className='price-list'>
            {priceList.routeProviders?.map(({id, route, provider}) => (
                <RouteProvider route={route}
                               provider={provider}
                               key={id}/>
            ))}
        </div>
    );
}