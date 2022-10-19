import React from 'react';
import {IRouteProvider} from '../../types/IRouteProvider';
import {RouteProvider} from '../price-list/RouteProvider';

interface Props {
    routeProviders: IRouteProvider[],
    onClick: (routeProvider: IRouteProvider) => void
};

export const ReservationCreationForm: React.FC<Props> = (props) => {
    const {
        routeProviders,
        onClick
    } = props;
    
    return (
        <div className='reservation-creation-form'>
            {routeProviders.map(routeProvider => (
                <RouteProvider routeProvider={routeProvider}
                               mode='delete'
                               key={routeProvider.id}
                               onClick={onClick} />
            ))}
        </div>
    );
}