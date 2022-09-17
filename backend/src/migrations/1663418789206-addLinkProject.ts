import { MigrationInterface, QueryRunner } from "typeorm";

export class addLinkProject1663418789206 implements MigrationInterface {
    name = 'addLinkProject1663418789206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "link" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "link"`);
    }

}
