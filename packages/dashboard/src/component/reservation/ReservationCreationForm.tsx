import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {useCreateReservationMutation} from '../../hooks/reservation/useCreateReservationMutation';
import {ICreateReservationInput} from '../../types/ICreateReservationInput';
import {IRouteProvider} from '../../types/IRouteProvider';
import {reservation} from '../../validation/resolvers/reservation';
import {Button} from '../ui-kit/Button';
import {RegisteredInput} from '../ui-kit/RegisteredInput';

interface Props {
    routeProviders: IRouteProvider[],
    clear: () => void
};

export const ReservationCreationForm: React.FC<Props> = (props) => {
    const {
        routeProviders,
        clear
    } = props;
    
    const {create, payload: {loading}} = useCreateReservationMutation();
    const form = useForm<ICreateReservationInput>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldUnregister: true,
        resolver: reservation
    });

    const {
        reset,
        handleSubmit,
    } = form;

    const routeProvidersIds = routeProviders.map(({id}) => id);
    const hasAddedRouteProviders = !!routeProviders.length;

    const handleSubmitForm = handleSubmit(async (context) => {
        try {
            await create({
                ...context,
                routeProvidersIds
            });
            clear();
            reset();
        } catch (e) {}
    });

    return (
        <div className='form-container'>
            <FormProvider {...form}>
                <form onSubmit={handleSubmitForm}>
                    <RegisteredInput label='First name'
                                     name='firstName' />

                    <RegisteredInput label='Last name'
                                     name='lastName' />

                    <Button className='route-provider-button route-provider-button--add'
                            type='submit'
                            text='Reserve'
                            disabled={loading || !hasAddedRouteProviders} />
                </form>
            </FormProvider>
        </div>
    );
}