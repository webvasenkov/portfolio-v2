import { MigrationInterface, QueryRunner } from "typeorm";

export class addDefaultValueToImg1663849573144 implements MigrationInterface {
    name = 'addDefaultValueToImg1663849573144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "img" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "img"`);
    }

}
