import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn, UpdateDateColumn
} from "typeorm";
import {v4 as generateUuid} from "uuid";
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

    @Column()
    distance: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => PriceList, (priceList) => priceList.routes)
    priceList: PriceList;
​
    @OneToOne(() => Provider)
    @JoinColumn()
    provider: Provider;
    
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

        return route;
    }
}
