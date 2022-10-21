import {IsNotEmpty, IsString} from 'class-validator';

export class ReservationsInputDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;
}
