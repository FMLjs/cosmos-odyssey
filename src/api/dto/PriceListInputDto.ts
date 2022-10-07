import {FilterInputDto} from "./FilterInputDto";
import {Type} from "class-transformer";
import {IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";

export class PriceListInputDto {
    @IsString()
    @IsNotEmpty()
    readonly origin: string;

    @IsString()
    @IsNotEmpty()
    readonly destination: string;

    @IsOptional()
    @Type(() => FilterInputDto)
    @ValidateNested()
    readonly filter?: FilterInputDto;
}