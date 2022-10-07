import {
    Column,
    CreateDateColumn,
    Entity, 
    PrimaryColumn, 
    UpdateDateColumn
} from "typeorm";
import {v4 as generateUuid} from "uuid";
import {ProviderDto} from "../dto/ProviderDto";

@Entity()
export class Provider {

    @PrimaryColumn()
    id: string = generateUuid();

    @Column({name: 'company_name'})
    companyName: string;
    
    @Column()
    price: number;

    @Column({name: 'flight_start'})
    flightStart: Date;

    @Column({name: 'flight_end'})
    flightEnd: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    static create(context: ProviderDto) {
        const {
            companyName,
            price,
            flightStart,
            flightEnd
        } = context;

        const provider = new Provider();

        provider.companyName = companyName;
        provider.price = price;
        provider.flightStart = flightStart;
        provider.flightEnd = flightEnd;

        return provider;
    }
}
