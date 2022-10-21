import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {SortDirection} from '../../enum/SortDirection';
import {SortField} from '../../enum/SortField';
import {IPriceListInput} from '../../types/IPriceListInput';
import {priceListResolver} from '../../validation/resolvers/priceList';
import {Button} from '../ui-kit/Button';
import {RegisteredInput} from '../ui-kit/RegisteredInput';
import {RegisteredSelect} from '../ui-kit/RegisteredSelect';

const sortFields = [
    {label: 'Price', value: SortField.Price}, 
    {label: 'Distance', value: SortField.Distance}, 
    {label: 'Travel time', value: SortField.TravelTime}
];

const sortDirections = [
    {label: 'Ascending', value: SortDirection.Asc}, 
    {label: 'Descending', value: SortDirection.Desc}, 
];

interface Props {
    setSearchRequest: (input: IPriceListInput) => void
};

export const PriceListForm: React.FC<Props> = (props) => {
    const {
        setSearchRequest
    } = props;
    
   const form = useForm<IPriceListInput>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldUnregister: true,
        resolver: priceListResolver
    });

    const {handleSubmit} = form;

    const handleSubmitForm = handleSubmit((context) => {
        setSearchRequest(context);
    });

    return (
        <div className='form-container'>
            <FormProvider {...form}>
                <form onSubmit={handleSubmitForm}>
                    <RegisteredInput label='Origin'
                                     name='origin' />

                    <RegisteredInput label='Destination'
                                     name='destination' />

                    <RegisteredInput label='Company name'
                                     name='filter.companyName' />

                    <RegisteredSelect name='filter.sort.field' 
                                      options={sortFields}
                                      label='Sort field'/>
                    <RegisteredSelect name='filter.sort.direction'
                                      options={sortDirections}
                                      label='Sort direction' />

                    <Button className='route-provider-button route-provider-button--add'
                            type='submit'
                            text='Search' />
                </form>
            </FormProvider>
        </div>
    );
}