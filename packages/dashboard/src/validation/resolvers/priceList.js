import {yupResolver} from '@hookform/resolvers/yup';
import {priceListSchema} from '../schemas/priceListSchema';

export const priceListResolver = yupResolver(priceListSchema);
