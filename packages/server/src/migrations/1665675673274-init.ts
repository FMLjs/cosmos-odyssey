import {MigrationInterface, QueryRunner} from "typeorm";

export class init1665675673274 implements MigrationInterface {
    name = 'init1665675673274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provider" ("id" character varying NOT NULL, "company_name" character varying NOT NULL, "price" double precision NOT NULL, "flight_start" TIMESTAMP NOT NULL, "flight_end" TIMESTAMP NOT NULL, "travel_time" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route" ("id" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "distance" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route_provider" ("id" character varying NOT NULL, "route_id" character varying, "provider_id" character varying, "price_list_id" character varying, CONSTRAINT "PK_9ece7a566ee056427b6ee587b9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price_list" ("id" character varying NOT NULL, "valid_until" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_52ea7826468b1c889cb2c28df03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "total_price" double precision NOT NULL, "total_travel_time" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "price_list_id" character varying NOT NULL, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "source_request" ("id" character varying NOT NULL, "original_response" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "source_id" character varying NOT NULL, CONSTRAINT "PK_23ab9d8bf3adae6c4433f0ce731" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservation_route_provider" ("reservation_id" character varying NOT NULL, "route_provider_id" character varying NOT NULL, CONSTRAINT "PK_39ccebfc3292c4ba32f773de542" PRIMARY KEY ("reservation_id", "route_provider_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f7b4d51232bdfb8d9b51b3cbf2" ON "reservation_route_provider" ("reservation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2167e00ef1874e593c904b0ffe" ON "reservation_route_provider" ("route_provider_id") `);
        await queryRunner.query(`ALTER TABLE "route_provider" ADD CONSTRAINT "FK_4cdd703dd6aab7ea2302eac93ae" FOREIGN KEY ("route_id") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route_provider" ADD CONSTRAINT "FK_885c570352bb67588ad7bfe7414" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route_provider" ADD CONSTRAINT "FK_93d7e43f333447e79a547a1a839" FOREIGN KEY ("price_list_id") REFERENCES "price_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation_route_provider" ADD CONSTRAINT "FK_f7b4d51232bdfb8d9b51b3cbf29" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reservation_route_provider" ADD CONSTRAINT "FK_2167e00ef1874e593c904b0ffed" FOREIGN KEY ("route_provider_id") REFERENCES "route_provider"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation_route_provider" DROP CONSTRAINT "FK_2167e00ef1874e593c904b0ffed"`);
        await queryRunner.query(`ALTER TABLE "reservation_route_provider" DROP CONSTRAINT "FK_f7b4d51232bdfb8d9b51b3cbf29"`);
        await queryRunner.query(`ALTER TABLE "route_provider" DROP CONSTRAINT "FK_93d7e43f333447e79a547a1a839"`);
        await queryRunner.query(`ALTER TABLE "route_provider" DROP CONSTRAINT "FK_885c570352bb67588ad7bfe7414"`);
        await queryRunner.query(`ALTER TABLE "route_provider" DROP CONSTRAINT "FK_4cdd703dd6aab7ea2302eac93ae"`);
        await queryRunner.query(`DROP INDEX "IDX_2167e00ef1874e593c904b0ffe"`);
        await queryRunner.query(`DROP INDEX "IDX_f7b4d51232bdfb8d9b51b3cbf2"`);
        await queryRunner.query(`DROP TABLE "reservation_route_provider"`);
        await queryRunner.query(`DROP TABLE "source_request"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "price_list"`);
        await queryRunner.query(`DROP TABLE "route_provider"`);
        await queryRunner.query(`DROP TABLE "route"`);
        await queryRunner.query(`DROP TABLE "provider"`);
    }

}
