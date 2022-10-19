import React, {useEffect, useState} from 'react';
import {usePriceListQuery} from '../hooks/price-list/usePriceListQuery';
import {Loader} from './loader/Loader';
import {PriceList} from './price-list/PriceList';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {ReservationCreationForm} from './reservation/ReservationCreationForm';
import {Reservations} from './reservation/Reservations';
import {IRouteProvider} from '../types/IRouteProvider';

export const Dashboard: React.FC = () => {
    const {load, payload: {data, loading, error}} = usePriceListQuery();
    const [addedRouteProvider, setAddedRouteProvider] = useState<IRouteProvider[]>([]);

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

    const addRouteProvider = (routeProvider: IRouteProvider) => setAddedRouteProvider(prevValue => [...prevValue, routeProvider]);
    
    const removeRoteProvider = (index: number) => {
        addedRouteProvider.splice(index, 1);
        setAddedRouteProvider(addedRouteProvider);
    }
    const addedRouteProvidersLength = addedRouteProvider.length;

    return (
        <div className="dashboard">
            <Tabs>
                <TabList>
                    <Tab>Price list</Tab>
                    <Tab>Create reservation <span className='label-number'>{addedRouteProvidersLength}</span></Tab>
                    <Tab>Reservations</Tab>
                </TabList>

                <TabPanel>
                    <PriceList priceList={data}
                               onClick={addRouteProvider} />
                </TabPanel>
                <TabPanel>
                    <ReservationCreationForm routeProviders={addedRouteProvider}
                                             onClick={addRouteProvider}/>
                </TabPanel>
                <TabPanel>
                    <Reservations/>
                </TabPanel>
            </Tabs>
        </div>
    );
}