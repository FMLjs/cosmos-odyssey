import React from 'react';
import {IRouteProvider} from '../../types/IRouteProvider';
import {convertMillisecondsToDaysAndHours} from '../../utils/convertMillisecondsToDaysAndHours';
import {Button} from '../ui-kit/Button';
import {FormattedDate} from '../ui-kit/FormattedDate';
import {Money} from '../ui-kit/Money';
import {Card} from './Card';

interface Props {
    routeProvider: IRouteProvider
    mode: 'add' | 'delete' | 'none',
    handleButtonClick?: () => void
};

export const RouteProvider: React.FC<Props> = (props) => {
    const {
        routeProvider,
        handleButtonClick,
        mode
    } = props;

    const {route, provider} = routeProvider;

    const travelTime = convertMillisecondsToDaysAndHours(provider.travelTime);

    return (
        <div className='route-provider'>
            <div className='route-provider-body'>
                <Card side='left'
                      object={route.from}>
                    <div>
                        <p>From: {route.from}</p>
                        <p>
                            Flight start:
                            <FormattedDate isTimeVisible>{provider.flightStart}</FormattedDate>
                        </p>
                    </div>
                </Card>

                <Card side='center'
                      object='rocket'>
                    <div>
                        <p>Company name: {provider.companyName}</p>
                        <p>Distance: {route.distance}</p>
                        <p>Travel time: {travelTime.days} days {travelTime.hours} hours</p>
                        <p>Price: <Money value={provider.price} /></p>
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
            <Button className={`route-provider-button route-provider-button--${mode}`}
                    onClick={handleButtonClick} 
                    type='button'
                    text={mode === 'add' ? 'Add' : 'Delete'}/>
        </div>
    );
}