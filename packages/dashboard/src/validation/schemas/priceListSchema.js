import * as yup from 'yup';

export const priceListSchema = yup.object({
    origin: yup.string().required('Origin is required'),
    destination: yup.string().required('Destination is required'),
    filter: yup.object({
        companyName: yup.string(),
        sort: yup.object({
            field: yup.string(),
            direction: yup.string(),
        })
    })
})