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
import {RouteProviderDto} from "../dto/RouteProviderDto";
import {RouteProvider} from "./RouteProvider";

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

    @OneToMany(() => RouteProvider, c => c.priceList, {
        cascade: true,
    })
    routeProviders: RouteProvider[];

    @AfterLoad()
    afterLoad() {
        if (!this.routeProviders) {
            this.routeProviders = [];
        }
    }

    addRouteProvider(routeProviderDto: RouteProviderDto) {
        const {routeProvider} = routeProviderDto;

        const createdRouteProvider = RouteProvider.create({routeProvider});

        this.routeProviders.push(createdRouteProvider);

        return routeProvider;
    }

    isLatest() {
        return new Date(this.validUntil).getTime() > new Date().getTime();
    }

    static create(context: PriceListDto) {
        const {
            response,
        } = context;

        const priceList = new PriceList();

        priceList.validUntil = response.validUntil;
        priceList.routeProviders = [];

        return priceList;
    }
}
