import { MigrationInterface, QueryRunner } from "typeorm";

export class init1663417549086 implements MigrationInterface {
    name = 'init1663417549086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tool" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3bf5b1016a384916073184f99b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "PK_2725f461500317f74b0c8f11859" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_645aa1cff2b9f7b0e3e73d66b4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_tools_tool" ("projectId" integer NOT NULL, "toolId" integer NOT NULL, CONSTRAINT "PK_ec268b8b982beef6549257a1d1f" PRIMARY KEY ("projectId", "toolId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c22ae5b08eb5c3ac3e3eb76554" ON "project_tools_tool" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_54c24575738e9b1193abf34486" ON "project_tools_tool" ("toolId") `);
        await queryRunner.query(`ALTER TABLE "project_tools_tool" ADD CONSTRAINT "FK_c22ae5b08eb5c3ac3e3eb765542" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_tools_tool" ADD CONSTRAINT "FK_54c24575738e9b1193abf344868" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_tools_tool" DROP CONSTRAINT "FK_54c24575738e9b1193abf344868"`);
        await queryRunner.query(`ALTER TABLE "project_tools_tool" DROP CONSTRAINT "FK_c22ae5b08eb5c3ac3e3eb765542"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54c24575738e9b1193abf34486"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c22ae5b08eb5c3ac3e3eb76554"`);
        await queryRunner.query(`DROP TABLE "project_tools_tool"`);
        await queryRunner.query(`DROP TABLE "social"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "tool"`);
    }

}
