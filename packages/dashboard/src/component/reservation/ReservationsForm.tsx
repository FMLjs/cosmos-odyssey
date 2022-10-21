import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {useReservationsLazyQuery} from '../../hooks/reservation/useReservationsLazyQuery';
import {IReservation} from '../../types/IReservation';
import {IReservationInput} from '../../types/IReservationInput';
import {reservation} from '../../validation/resolvers/reservation';
import {Button} from '../ui-kit/Button';
import {RegisteredInput} from '../ui-kit/RegisteredInput';

interface Props {
    setFoundReservations: (reservations: IReservation[]) => void
};

export const ReservationsForm: React.FC<Props> = (props) => {
    const {
        setFoundReservations
    } = props;

    const {load, payload: {loading}} = useReservationsLazyQuery({
        setFoundReservations
    });
    const form = useForm<IReservationInput>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldUnregister: true,
        resolver: reservation
    });

    const {
        reset,
        handleSubmit,
    } = form;

    const handleSubmitForm = handleSubmit(async (context) => {
        try {
            load(context);
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
                            text='Search'
                            disabled={loading} />
                </form>
            </FormProvider>
        </div>
    );
}