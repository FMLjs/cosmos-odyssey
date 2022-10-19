import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TravelService} from "src/travel/service/TravelService";
import {SourceRequestModule} from "src/source-request/SourceRequestModule";
import {PriceListDAO} from "./domain/dao/PriceListDAO";
import {RouteProviderDAO} from "./domain/dao/RouteProviderDAO";
import {PriceList} from "./domain/entity/PriceList";
import {Provider} from "./domain/entity/Provider";
import {Route} from "./domain/entity/Route";
import {RouteProvider} from "./domain/entity/RouteProvider";
import {PriceListService} from "./domain/service/PriceListService";
import {RouteProviderService} from "./domain/service/RouteProviderService";
import {TravelModule} from "src/travel/TravelModule";

@Module({
    imports: [
        SourceRequestModule,
        TravelModule,
        TypeOrmModule.forFeature([
            PriceList,
            Provider,
            Route,
            RouteProvider,
        ])
    ],
    providers: [
        TravelService,
        PriceListService,
        PriceListDAO,
        RouteProviderDAO,
        RouteProviderService
    ],
    exports: [
        PriceListService,
        RouteProviderService,
    ]
})
export class PriceListModule { }
