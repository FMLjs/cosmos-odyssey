import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn, UpdateDateColumn
} from "typeorm";
import {v4 as generateUuid} from "uuid";
import {ProviderDto} from "../dto/ProviderDto";
import {RouteDto} from "../dto/RouteDto";
import {PriceList} from "./PriceList";
import {Provider} from "./Provider";

@Entity()
export class Route {

    @PrimaryColumn()
    id: string = generateUuid();

    @Column()
    from: string;

    @Column()
    to: string;

    @Column({
        type: 'bigint'
    })
    distance: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => PriceList, (priceList) => priceList.routes)
    @JoinColumn({ name: 'price_list_id' })
    priceList: PriceList;

    @OneToMany(() => Provider, c => c.route, {
        cascade: true,
        eager: true
    })
    providers: Provider[];

    addProvider(providerDto: ProviderDto) {
        const provider = Provider.create(providerDto);

        this.providers.push(provider);

        return provider;
    }

    static create(context: RouteDto) {
        const {
            from,
            to,
            distance
        } = context;

        const route = new Route();
        
        route.from = from;
        route.to = to;
        route.distance = distance;
        route.providers = [];

        return route;
    }
}
