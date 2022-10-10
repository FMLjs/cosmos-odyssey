import {Type} from "class-transformer";
import {IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {SortDirection} from "src/enum/SortDirection";
import {SortField} from "src/enum/SortField";

export class SortInputDto {
    @IsEnum(SortField)
    readonly field: SortField;

    @IsEnum(SortDirection)
    readonly direction: SortDirection
}

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