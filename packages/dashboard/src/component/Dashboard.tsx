import React, {useEffect} from 'react';
import {usePriceListQuery} from '../hooks/price-list/usePriceListQuery';
import {Loader} from './loader/Loader';
import {PriceList} from './price-list/PriceList';

export function Dashboard() {
    const {load, payload: {data, loading, error}} = usePriceListQuery();
    
    useEffect(() => {
        load({
            origin: 'Earth',
            destination: 'Jupiter',
        })
    }, []);
    
    if (error) {
        return <></>
    } else if (!data) {
        return <></>
    } else if (loading) {
        return <Loader loading={loading} />
    }

    return (
        <div className="dashboard">
            <PriceList priceList={data}/>
        </div>
    ); 
}