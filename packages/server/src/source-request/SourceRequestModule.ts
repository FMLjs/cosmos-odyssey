import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SourceRequestDAO} from "./domain/dao/SourceRequestDAO";
import {SourceRequest} from "./domain/entity/SourceRequest";
import {SourceRequestService} from "./domain/service/SourceRequestService";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SourceRequest
        ])
    ],
    providers: [
        SourceRequestService,
        SourceRequestDAO,
    ],
    exports:[
        SourceRequestService
    ]
})
export class SourceRequestModule { }
