import {MigrationInterface, QueryRunner} from "typeorm";

export class init1665314575668 implements MigrationInterface {
    name = 'init1665314575668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provider" ("id" character varying NOT NULL, "company_name" character varying NOT NULL, "price" double precision NOT NULL, "flight_start" TIMESTAMP NOT NULL, "flight_end" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "route_id" character varying, CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route" ("id" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "distance" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "price_list_id" character varying, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price_list" ("id" character varying NOT NULL, "valid_until" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_52ea7826468b1c889cb2c28df03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "source_request" ("id" character varying NOT NULL, "original_response" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "source_id" character varying NOT NULL, CONSTRAINT "PK_23ab9d8bf3adae6c4433f0ce731" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_e8c3a0fbf8cf57fe900f4bf82a8" FOREIGN KEY ("route_id") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_b7bf5684f40a2c32f2da15ad975" FOREIGN KEY ("price_list_id") REFERENCES "price_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_b7bf5684f40a2c32f2da15ad975"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_e8c3a0fbf8cf57fe900f4bf82a8"`);
        await queryRunner.query(`DROP TABLE "source_request"`);
        await queryRunner.query(`DROP TABLE "price_list"`);
        await queryRunner.query(`DROP TABLE "route"`);
        await queryRunner.query(`DROP TABLE "provider"`);
    }

}
