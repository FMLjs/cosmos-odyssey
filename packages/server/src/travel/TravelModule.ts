import {HttpModule} from "@nestjs/axios";
import {Module} from "@nestjs/common";
import {TravelService} from "./service/TravelService";

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        TravelService,
    ],
    exports: [
        TravelService,
        HttpModule
    ]
})
export class TravelModule { }
