import {SortDirection} from "../enum/SortDirection"
import {SortField} from "../enum/SortField"

export interface ISort {
    field: SortField
    direction: SortDirection
}