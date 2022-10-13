import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity, OneToMany, PrimaryColumn, UpdateDateColumn
} from "typeorm";
import {v4 as generateUuid} from "uuid";
import {RouteDto} from "../dto/RouteDto";
import {RouteProvider} from './RouteProvider';

@Entity()
export class Route {

    @PrimaryColumn()
    id: string = generateUuid();

    @Column()
    from: string;

    @Column()
    to: string;

    @Column({type: 'bigint'})
    distance: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => RouteProvider, routeProvider => routeProvider.route)
    routeProviders: RouteProvider[];

    @AfterLoad()
    afterLoad() {
        if (!this.routeProviders) {
            this.routeProviders = [];
        }
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

        return route;
    }
}
