import {yupResolver} from '@hookform/resolvers/yup';
import {reservationSchema} from '../schemas/reservationSchema';

export const reservation = yupResolver(reservationSchema);
