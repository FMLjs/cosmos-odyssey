import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {Module} from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql";
import {ValidationPipe} from "src/infrastructure/filter/ValidationPipe";
import {PriceListModule} from "src/price-list/PriceListModule";
import {ReservationModule} from "src/reservation/ReservationModule";
import {PriceListResolver} from "./resolver/PriceListResolver";
import {ReservationResolver} from "./resolver/ReservationResolver";

@Module({
    imports: [
        PriceListModule,
        ReservationModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ['./**/schema.graphql']
        })
    ],
    providers: [
        PriceListResolver,
        ReservationResolver,
        ValidationPipe.providePipe(),
    ]
})
export class ApiModule { }
