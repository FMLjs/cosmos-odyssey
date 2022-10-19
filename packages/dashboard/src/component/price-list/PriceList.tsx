import React from 'react';
import {IPriceList} from '../../types/IPriceList';
import {IRouteProvider} from '../../types/IRouteProvider';
import {RouteProvider} from './RouteProvider';

interface Props {
    priceList: IPriceList;
    onClick: (routeProvider: IRouteProvider) => void
};

export const PriceList: React.FC<Props> = (props) => {
    const {
        priceList,
        onClick
    } = props;
    
    return (
        <div className='price-list'>
            {priceList.routeProviders.map(routeProvider => (
                <RouteProvider routeProvider={routeProvider}
                               mode='add'
                               key={routeProvider.id}
                               onClick={onClick}/>
            ))}
        </div>
    );
}