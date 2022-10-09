import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {v4 as generateUuid} from "uuid";
import {PriceListDto} from "../dto/PriceListDto";
import {RouteDto} from "../dto/RouteDto";
import {Route} from "./Route";

@Entity()
export class PriceList {

    @PrimaryColumn()
    id: string = generateUuid();

    @Column({name: 'valid_until'})
    validUntil: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => Route, c => c.priceList, {
        cascade: true,
        eager: true
    })
    routes: Route[];

    @AfterLoad()
    afterLoad() {
        if (!this.routes) {
            this.routes = [];
        }
    }

    addRoute(routeDto: RouteDto) {
        const route = Route.create(routeDto);

        this.routes.push(route);

        return route;
    }

    isActual() {
        return new Date(this.validUntil).getTime() > new Date().getTime();
    }
    
    static create(context: PriceListDto) {
        const {
            response,
        } = context;

        const priceList = new PriceList();
        
        priceList.validUntil = response.validUntil;
        priceList.routes = [];

        return priceList;
    }
}
