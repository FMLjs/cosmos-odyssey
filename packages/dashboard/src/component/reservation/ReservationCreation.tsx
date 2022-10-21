import React from 'react';
import {IRouteProvider} from '../../types/IRouteProvider';
import {convertMillisecondsToDaysAndHours} from '../../utils/convertMillisecondsToDaysAndHours';
import {RouteProvider} from '../price-list/RouteProvider';
import {Money} from '../ui-kit/Money';
import {ReservationCreationForm} from './ReservationCreationForm';

interface Props {
    routeProviders: IRouteProvider[],
    removeRouteProvider: (index: number) => void,
    clear: () => void
};

export const ReservationCreation: React.FC<Props> = (props) => {
    const {
        routeProviders,
        removeRouteProvider,
        clear
    } = props;
    
    const hasRouteProviders = !!routeProviders.length;

    const totalPrice = routeProviders.reduce((prev, curr) => prev + Number(curr.provider.price), 0);
    const totalTravelTime = routeProviders.reduce((prev, curr) => prev + Number(curr.provider.travelTime), 0);

    const travelTime = convertMillisecondsToDaysAndHours(totalTravelTime);

    return (
        <div className='container reservation-creation'>
            <ReservationCreationForm routeProviders={routeProviders}
                                     clear={clear}/>
            {!hasRouteProviders && <span className='empty-message'>You have not added routes to your reservation yet</span>}
            {hasRouteProviders && (
                <>
                    <div className='total'>
                        <p>Total price: <Money value={totalPrice} /></p>
                        <p>Travel time: {travelTime.days} days {travelTime.hours} hours</p>
                    </div>
                    {routeProviders.map((routeProvider, i) => (
                        <RouteProvider routeProvider={routeProvider}
                                       mode='delete'
                                       key={routeProvider.id + i}
                                       handleButtonClick={() => removeRouteProvider(i)} />
                    ))}
                </>
            )}
        </div>
    );
}