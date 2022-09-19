import { MigrationInterface, QueryRunner } from "typeorm";

export class changeFieldPassword1663590260797 implements MigrationInterface {
    name = 'changeFieldPassword1663590260797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "passowrd" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "passowrd"`);
    }

}
