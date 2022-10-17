import {Env} from "./utils/Env";

export const Config = {
    apiUrl: Env.get<string>('COSMOS_ODYSSEY_URL'),

    db: {
        type: Env.get<string>('TYPEORM_CONNECTION'),
        host: Env.get<string>('TYPEORM_HOST'),
        port: Env.getAsInt('TYPEORM_PORT'),
        username: Env.get<string>('TYPEORM_USERNAME'),
        password: Env.get<string>('TYPEORM_PASSWORD'),
        database: Env.get<string>('TYPEORM_DATABASE')
    },
}