import {Injectable} from "@nestjs/common";
import {SourceRequestDAO} from "../dao/SourceRequestDAO";
import {SourceRequestDto} from '../../../price-list/domain/dto/SourceRequestDto';
import {SourceRequest} from "../entity/SourceRequest";

@Injectable()
export class SourceRequestService {

    constructor(
        private readonly sourceRequestDao: SourceRequestDAO,
    ) { }

    
    async create(context: SourceRequestDto) {
        const {
            response,
            sourceId
        } = context;

        const sourceRequest = SourceRequest.create({
            response,
            sourceId
        });

        await this.sourceRequestDao.save(sourceRequest);

        return sourceRequest;
    }
}
