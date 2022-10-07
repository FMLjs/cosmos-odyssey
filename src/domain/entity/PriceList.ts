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

    @Column({
        type: 'json',
        name: 'original_response'
    })
    originalResponse: Object;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => Route, c => c.priceList, {
        cascade: true,
        eager: true
    })
    routes: Route[];

    addRoute(routeDto: RouteDto) {
        const route = Route.create(routeDto);

        this.routes.push(route);

        return this;
    }

    isActual() {
        return new Date(this.validUntil).getTime() > new Date().getTime();
    }

    @AfterLoad()
    afterLoad() {
        if (!this.routes) {
            this.routes = [];
        }
    }

    static create(context: PriceListDto) {
        const {
            originalResponse,
            validUntil
        } = context;

        const priceList = new PriceList();
        
        priceList.originalResponse = originalResponse;
        priceList.validUntil = validUntil;

        return priceList;
    }
}
