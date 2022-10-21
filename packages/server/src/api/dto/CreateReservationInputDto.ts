import {IsArray, IsNotEmpty, IsString, IsUUID} from "class-validator";

export class CreateReservationInputDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsUUID(4, {each: true})
    @IsArray()
    readonly routeProvidersIds: string[]
}