import React from 'react';
import {IReservation} from '../../types/IReservation';
import {convertMillisecondsToDaysAndHours} from '../../utils/convertMillisecondsToDaysAndHours';
import {RouteProvider} from '../price-list/RouteProvider';
import {Money} from '../ui-kit/Money';

interface Props {
    reservation: IReservation
};

export const Reservation: React.FC<Props> = (props) => {
    const {
        reservation,
    } = props;
    
    const travelTime = convertMillisecondsToDaysAndHours(reservation.totalTravelTime);

    return (
        <div className='container reservation'>
            <div className='total'>
                <p>Total price: <Money value={reservation.totalPrice} /></p>
                <p>Travel time: {travelTime.days} days {travelTime.hours} hours</p>
            </div>
            
            {reservation.routeProviders.map((routeProvider, i) => (
                <RouteProvider routeProvider={routeProvider}
                               mode='none'
                               key={routeProvider.id + i} />
            ))}
        </div>
    );
}