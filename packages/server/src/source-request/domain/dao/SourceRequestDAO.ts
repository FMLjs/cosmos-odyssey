import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SourceRequest} from './../entity/SourceRequest';

@Injectable()
export class SourceRequestDAO {

    constructor(
        @InjectRepository(SourceRequest)
        private readonly sourceRequestRepository: Repository<SourceRequest>,
    ) {
    }

    save(sourceRequest: SourceRequest){
        return this.sourceRequestRepository.save(sourceRequest);
    }
}
