import {useLazyQuery} from "@apollo/client";
import Q from '../../graphql/reservation/Reservations.query.graphql';
import {IReservation} from "../../types/IReservation";
import {IReservationInput} from "../../types/IReservationInput";

interface IContext {
    setFoundReservations: (reservations: IReservation[]) => void
}

export function useReservationsLazyQuery(context: IContext) {
    const {
        setFoundReservations    
    } = context;

    const [execute, payload] = useLazyQuery<{reservations: IReservation[]}>(Q, {
        onCompleted: (data) => setFoundReservations(data.reservations)
    });
    
    return {
        load: (input: IReservationInput) => execute({variables: {input}}),
        payload
    }
}
