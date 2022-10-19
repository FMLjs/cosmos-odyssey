import moment from 'moment';
import React from 'react';
import {IRouteProvider} from '../../types/IRouteProvider';
import {FormattedDate} from '../ui-kit/FormattedDate';
import {Card} from './Card';

interface Props {
    routeProvider: IRouteProvider
    mode: 'add' | 'delete',
    onClick: (routeProvider: IRouteProvider) => void
};

export const RouteProvider: React.FC<Props> = (props) => {
    const {
        routeProvider,
        onClick,
        mode
    } = props;

    const {route, provider} = routeProvider;
    const duration = moment.duration(provider.travelTime, 'milliseconds');
    const travelTimeInDays = duration.asDays();

    const handleClick = () => onClick(routeProvider);

    return (
        <div className='route-provider'>
            <div className='route-provider-body'>
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
            <button className={`route-provider-button route-provider-button--${mode}`}
                    onClick={handleClick} >
                {mode === 'add' ? 'Add' : 'Delete'}
            </button>
        </div>
    );
}