import {Env} from "./util/Env";

export const Config = {
    apiUrl: Env.get<string>('COSMOS_ODYSSEY_URL'),

    db: {
        type: 'postgres',
        host: Env.get<string>('DB_HOST'),
        port: Env.getAsInt('DB_PORT'),
        username: Env.get<string>('DB_USERNAME'),
        password: Env.get<string>('DB_PASSWORD'),
        database: Env.get<string>('DB_NAME'),
        synchronize: true,
    },
}