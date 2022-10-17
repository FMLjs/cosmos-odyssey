import {Type} from "class-transformer";
import {IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {SortInputDto} from "./SortInputDto";

export class FilterInputDto {
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly companyName?: string;

    @IsOptional()
    @Type(() => SortInputDto)
    @ValidateNested()
    readonly sort?: SortInputDto;
}