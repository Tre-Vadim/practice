import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFollows1732543300439 implements MigrationInterface {
  name = 'CreateFollows1732543300439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "follows" (
                "id" BIGSERIAL NOT NULL,
                "followerId" integer NOT NULL,
                "followingId" integer NOT NULL,
                CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "follows"
        `);
  }
}
