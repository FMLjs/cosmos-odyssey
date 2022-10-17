import React from 'react';
import {usePriceListQuery} from '../hooks/price-list/usePriceListQuery';

export function Dashboard() {
    const {data, loading, error} = usePriceListQuery();

    return (
        <div className="dashboard">
            Hi, im dashboard
        </div>
    );
}