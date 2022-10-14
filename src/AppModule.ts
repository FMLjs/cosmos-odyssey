import {HttpModule} from '@nestjs/axios';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PriceListController} from './api/PriceListController';
import {ReservationController} from './api/ReservationController';
import {Config} from './Config';
import {PriceListDAO} from './domain/dao/PriceListDAO';
import {ReservationDAO} from './domain/dao/ReservationDAO';
import {RouteProviderDAO} from './domain/dao/RouteProviderDAO';
import {SourceRequestDAO} from './domain/dao/SourceRequestDAO';
import {PriceList} from './domain/entity/PriceList';
import {Provider} from './domain/entity/Provider';
import {Reservation} from './domain/entity/Reservation';
import {Route} from './domain/entity/Route';
import {RouteProvider} from './domain/entity/RouteProvider';
import {SourceRequest} from './domain/entity/SourceRequest';
import {PriceListService} from './domain/service/PriceListService';
import {ReservationService} from './domain/service/ReservationService';
import {SourceRequestService} from './domain/service/SourceRequestService';
import {ValidationPipe} from './infrastructure/filter/ValidationPipe';
import {TravelService} from './infrastructure/service/TravelService';

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
        ValidationPipe.providePipe(),
    ],
    controllers: [
        PriceListController,
        ReservationController
    ]
})
export class AppModule { }
