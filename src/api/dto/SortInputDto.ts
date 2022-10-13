import {SortDirection} from './../../enum/SortDirection';
import {SortField} from './../../enum/SortField';
import {IsEnum} from 'class-validator';

export class SortInputDto {
    @IsEnum(SortField)
    readonly field: SortField;

    @IsEnum(SortDirection)
    readonly direction: SortDirection
}