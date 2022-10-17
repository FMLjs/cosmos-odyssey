import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApiModule} from './api/ApiModule';
import {Config} from './Config';

@Module({
    imports: [
        ApiModule,
        TypeOrmModule.forRoot({
            type: Config.db.type,
            host: Config.db.host,
            port: Config.db.port,
            username: Config.db.username,
            password: Config.db.password,
            database: Config.db.database,
            autoLoadEntities: true,
        })
    ]
})
export class AppModule { }
