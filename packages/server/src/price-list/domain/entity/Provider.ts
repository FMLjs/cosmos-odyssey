import {MoneyUtils} from 'src/utils/MoneyUtils';
import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity, OneToMany, PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import {v4 as generateUuid} from 'uuid';
import {ProviderDto} from '../dto/ProviderDto';
import {RouteProvider} from './RouteProvider';

@Entity()
export class Provider {

    @PrimaryColumn()
    id: string = generateUuid();

    @Column({name: 'company_name'})
    companyName: string;

    @Column({type: 'bigint'})
    price: number;

    @Column({name: 'flight_start'})
    flightStart: Date;

    @Column({name: 'flight_end'})
    flightEnd: Date;

    @Column({
        name: 'travel_time',
        type: 'bigint'
    })
    travelTime: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => RouteProvider, routeProvider => routeProvider.provider)
    routeProviders: RouteProvider[];

    @AfterLoad()
    afterLoad() {
        if (!this.routeProviders) {
            this.routeProviders = [];
        }
    }

    static create(context: ProviderDto) {
        const {
            companyName,
            price,
            flightStart,
            flightEnd
        } = context;

        const provider = new Provider();
        provider.companyName = companyName;
        provider.price = MoneyUtils.toCent(price);
        provider.flightStart = flightStart;
        provider.flightEnd = flightEnd;
        provider.travelTime = new Date(flightEnd).getTime() - new Date(flightStart).getTime();

        return provider;
    }
}
