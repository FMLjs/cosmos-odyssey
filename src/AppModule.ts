import {Module} from '@nestjs/common';
import {AppController} from './api/AppController';
import {HttpModule} from '@nestjs/axios';
import {ConfigModule} from '@nestjs/config';
import {TravelService} from './service/TravelService';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot()
    ],
    controllers: [
        AppController
    ],
    providers: [
        TravelService
    ],
})
export class AppModule { }
