import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './api/AppController';
import {HttpModule} from '@nestjs/axios';
import {TravelService} from './service/TravelService';
import {APP_PIPE} from '@nestjs/core';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Config} from './Config';
import {PriceListService} from './domain/service/PriceListService';
import {PriceList} from './domain/entity/PriceList';
import {Provider} from './domain/entity/Provider';
import {Route} from './domain/entity/Route';
import {SourceRequest} from './domain/entity/SourceRequest';
import {SourceRequestService} from './domain/service/SourceRequestService';
import {PriceListDAO} from './domain/dao/PriceListDAO';
import {RouteProvider} from './domain/entity/RouteProvider';
import {Reservation} from './domain/entity/Reservation';
import {ReservationService} from './domain/service/ReservationService';
import {SourceRequestDAO} from './domain/dao/SourceRequestDAO';
import {RouteProviderDAO} from './domain/dao/RouteProviderDAO';
import {ReservationDAO} from './domain/dao/ReservationDAO';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRoot({
            type: Config.db.type,
            host: Config.db.host,
            port: Config.db.port,
            username: Config.db.username,
            password: Config.db.password,
            database: Config.db.database,
            autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([
            PriceList,
            Provider,
            Route,
            SourceRequest,
            RouteProvider,
            Reservation
        ])
    ],
    providers: [
        TravelService,
        PriceListService,
        SourceRequestService,
        ReservationService,
        SourceRequestDAO,
        PriceListDAO,
        RouteProviderDAO,
        ReservationDAO,
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({
                transform: true,
                forbidUnknownValues: true,
                validationError: {target: false}
            })
        },
    ],
    controllers: [
        AppController
    ]
})
export class AppModule { }
