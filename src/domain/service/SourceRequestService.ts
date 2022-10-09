import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {SourceRequestDto} from '../dto/SourceRequestDto';
import {SourceRequest} from '../entity/SourceRequest';

@Injectable()
export class SourceRequestService {

    constructor(
        @InjectRepository(SourceRequest)
        private readonly sourceRequestRepository: Repository<SourceRequest>,
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

        await this.sourceRequestRepository.save(sourceRequest);

        return sourceRequest;
    }
}
