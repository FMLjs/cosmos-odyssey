import {
    Column,
    CreateDateColumn,
    Entity, PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {v4 as generateUuid} from "uuid";
import {SourceRequestDto} from "../dto/SourceRequestDto";

@Entity()
export class SourceRequest {

    @PrimaryColumn()
    id: string = generateUuid();

    @Column({
        type: 'json',
        name: 'original_response'
    })
    originalResponse: Object;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({name: 'source_id'})
    sourceId: string;

    static create(context: SourceRequestDto) {
        const {
            sourceId,
            response
        } = context;

        const source = new SourceRequest();
        
        source.sourceId = sourceId;
        source.originalResponse = response;
        
        return source;
    }
}
