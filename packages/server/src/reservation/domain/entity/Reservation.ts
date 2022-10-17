import {RouteProvider} from 'src/price-list/domain/entity/RouteProvider';
import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany, PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import {v4 as generateUuid} from 'uuid';
import {ReservationDto} from '../dto/ReservationDto';

@Entity()
export class Reservation {

    @PrimaryColumn()
    id: string = generateUuid();

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

    @Column({
        type: 'double precision',
        name: 'total_price'
    })
    totalPrice: number = 0;

    @Column({
        type: 'bigint',
        name: 'total_travel_time'
    })
    totalTravelTime: number = 0;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({name: 'price_list_id'})
    priceListId: string;

    @JoinTable({
        name: 'reservation_route_provider',
        joinColumn: {name: 'reservation_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'route_provider_id', referencedColumnName: 'id'}
    })
    @ManyToMany(() => RouteProvider)
    routeProviders: RouteProvider[];

    @AfterLoad()
    afterLoad() {
        if (!this.routeProviders) {
            this.routeProviders = [];
        }
    }

    addRouteProvider(context: RouteProvider) {
        const {
            provider
        } = context;
        
        //Need to convert to number as postgres converts bigint to string
        this.totalPrice = Math.round((this.totalPrice + Number(provider.price)) * 100) / 100;
        this.totalTravelTime = Math.round((this.totalTravelTime + Number(provider.travelTime)) * 100) / 100;
        this.routeProviders.push(context);

        return context;
    };

    static create(context: ReservationDto) {
        const {
            firstName,
            lastName,
            priceListId
        } = context;

        const reservation = new Reservation();

        reservation.firstName = firstName;
        reservation.lastName = lastName;
        reservation.priceListId = priceListId;
        reservation.routeProviders = [];

        return reservation;
    }
}
