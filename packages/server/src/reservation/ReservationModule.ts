import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PriceListModule} from "src/price-list/PriceListModule";
import {ReservationDAO} from "./domain/dao/ReservationDAO";
import {Reservation} from "./domain/entity/Reservation";
import {ReservationService} from "./domain/service/ReservationService";

@Module({
    imports: [
        PriceListModule,
        TypeOrmModule.forFeature([
            Reservation
        ])
    ],
    providers: [
        ReservationService,
        ReservationDAO,
    ],
    exports: [
        ReservationService
    ]
})
export class ReservationModule { }
