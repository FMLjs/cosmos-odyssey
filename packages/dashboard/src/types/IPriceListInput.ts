import {IFilter} from "./IFilter";

export interface IPriceListInput {
    origin: string,
    destination: string,
    filter?: IFilter
}