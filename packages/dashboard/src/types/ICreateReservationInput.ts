import {IReservation} from "./IReservation";

export interface ICreateReservationInput extends IReservation {
    routeProvidersIds: string[]
}