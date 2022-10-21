import M from '../../graphql/reservation/CreateReservation.mutation.graphql';
import {useMutation} from "@apollo/client";
import {ICreateReservationInput} from '../../types/ICreateReservationInput';
import {IReservation} from '../../types/IReservation';

export function useCreateReservationMutation() {
    const [execute, payload] = useMutation<{reservation: IReservation}>(M);

    return {
        create: (input: ICreateReservationInput) => execute({variables: {input}}),
        payload
    };
}
