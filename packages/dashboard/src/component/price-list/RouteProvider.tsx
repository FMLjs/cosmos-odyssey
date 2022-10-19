import moment from 'moment';
import React from 'react';
import {IProvider} from '../../types/IProvider';
import {IRoute} from '../../types/IRoute';
import {FormattedDate} from '../ui-kit/FormattedDate';
import {Card} from './Card';

interface Props {
    route: IRoute;
    provider: IProvider;
};

export const RouteProvider: React.FC<Props> = (props) => {
    const {
        route,
        provider
    } = props;
    
    const end = moment([new Date(provider.flightEnd).toISOString()]);
    const start = moment([new Date(provider.flightStart).toISOString()]);
    const travelTimeInDays = end.diff(start, 'days');

    return (
        <div className='route-provider'>
            <Card side='left'
                  object={route.from}>
                <div>
                    <p>From: {route.from}</p>
                    <p>
                        Flight start:
                        <FormattedDate isTimeVisible={true}>{provider.flightStart}</FormattedDate>
                    </p>
                </div>
            </Card>

            <Card side='center'
                  object='rocket'>
                <div>
                    <p>Company name: {provider.companyName}</p>
                    <p>Distance: {route.distance}</p>
                    <p>Travel time: {travelTimeInDays}</p>
                    <p>Price: {provider.price}</p>
                </div>
            </Card>

            <Card side='right'
                  object={route.to}>
                <div>
                    <p>To: {route.to}</p>
                    <p>
                        Flight end:
                        <FormattedDate isTimeVisible={true}>{provider.flightEnd}</FormattedDate>
                    </p>
                </div>
            </Card>
        </div>
    );
}