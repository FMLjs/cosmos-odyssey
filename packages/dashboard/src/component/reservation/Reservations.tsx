import React, {useState} from 'react';
import {IReservation} from '../../types/IReservation';
import {Reservation} from './Reservation';
import {ReservationsForm} from './ReservationsForm';

export const Reservations: React.FC = () => {

    const [foundReservations, setFoundReservations] = useState<IReservation[]>([]);

    const hasReservations = !!foundReservations.length;

    return (
        <div className='container reservations'>
            <ReservationsForm setFoundReservations={setFoundReservations}/>
            {!hasReservations && <span className='empty-message'>No reservations found. Fill out the search form.</span>}
            {foundReservations.map(reservation => (
                <Reservation reservation={reservation}/>
            ))}
        </div>
    );
}