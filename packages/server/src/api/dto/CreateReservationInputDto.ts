import {Type} from "class-transformer";
import {IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested} from "class-validator";

class RouteProviderInput {
    @IsUUID()
    @IsNotEmpty()
    readonly routeId: string;

    @IsUUID()
    @IsNotEmpty()
    readonly providerId: string;
}

export class CreateReservationInputDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @Type(() => RouteProviderInput)
    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    readonly routeProviders: RouteProviderInput[];
}