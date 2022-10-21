import React, {useEffect, useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {IPriceList} from '../types/IPriceList';
import {IRouteProvider} from '../types/IRouteProvider';
import {PriceList} from './price-list/PriceList';
import {ReservationCreation} from './reservation/ReservationCreation';
import {Reservations} from './reservation/Reservations';

export const Dashboard: React.FC = () => {
    const [addedRouteProvider, setAddedRouteProvider] = useState<IRouteProvider[]>([]);
    const [currentPriceList, setCurrentPriceList] = useState<IPriceList | undefined>();

    useEffect(() => {
        if (!!currentPriceList?.validUntil) {
            const priceListExpiresin = new Date(currentPriceList.validUntil).getTime() - new Date().getTime();

            const timer = setTimeout(() => clear(), priceListExpiresin);

            return () => clearTimeout(timer);
        }
    }, [currentPriceList]);

    const addRouteProvider = (routeProvider: IRouteProvider) => setAddedRouteProvider(prevValue => [...prevValue, routeProvider]);
    
    const removeRouteProvider = (index: number) => {
        const oldArray = [...addedRouteProvider];

        oldArray.splice(index, 1);

        setAddedRouteProvider(oldArray);
    }
    
    const addedRouteProvidersLength = addedRouteProvider.length;

    const clear = () => {
        setAddedRouteProvider([]);
        setCurrentPriceList(undefined);
    };

    return (
        <div className="container dashboard">
            <Tabs>
                <TabList>
                    <Tab>Price list</Tab>
                    <Tab>
                        Create reservation <span className='label-number'>{addedRouteProvidersLength}</span>
                    </Tab>
                    <Tab>Reservations</Tab>
                </TabList>

                <TabPanel>
                    <PriceList addRouteProvider={addRouteProvider}
                               currentPriceList={currentPriceList}
                               setCurrentPriceList={setCurrentPriceList} />
                </TabPanel>
                <TabPanel>
                    <ReservationCreation routeProviders={addedRouteProvider}
                                         removeRouteProvider={removeRouteProvider}
                                         clear={clear} />
                </TabPanel>
                <TabPanel>
                    <Reservations/>
                </TabPanel>
            </Tabs>
        </div>
    );
}