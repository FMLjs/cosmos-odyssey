import {IsNotEmpty, IsUUID} from 'class-validator';

export class ReservationInputDto {
    @IsUUID()
    @IsNotEmpty()
    readonly reservationId: string;
}
