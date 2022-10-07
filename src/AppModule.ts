import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './api/AppController';
import {HttpModule} from '@nestjs/axios';
import {TravelService} from './service/TravelService';
import {APP_PIPE} from '@nestjs/core';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Config} from './Config';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRoot(<any>Config.db),
    ],
    controllers: [
        AppController
    ],
    providers: [
        TravelService,
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({
                transform: true,
                forbidUnknownValues: true,
                validationError: {target: false}
            })
        },
    ],
})
export class AppModule { }
